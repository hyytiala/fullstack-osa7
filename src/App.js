import React from 'react'
import Notification from './components/Notification'
import Error from './components/Error'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/blogForm'
import { setNotification, setError } from './reducers/notificationReducer'
import { usersInitialization } from './reducers/userReducer'
import { blogsInitialization } from './reducers/blogReducer'
import { connect } from 'react-redux'
import { Container, Form, Button } from 'semantic-ui-react'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Navigation from './components/Menu'
import UserList from './components/UserList'
import User from './components/User'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      user: null
    }
  }

  componentDidMount = async () => {
    await this.props.usersInitialization()
    await this.props.blogsInitialization()
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({
        username: '',
        password: '',
        user
      })
      this.props.setNotification(`User logged in`, 5)
    } catch (exception) {
      this.setState({
        password: ''
      })
      this.props.setError('Wrong username or password', 5)
    }
  }

  logOut = () => {
    window.localStorage.removeItem('loggedUser')
    this.setState({
      user: null
    })
  }

  render() {
    const loginForm = () => (
      <div>
        <h2>Log in please</h2>

        <Form onSubmit={this.login}>
          <Form.Field>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </Form.Field>
          <Button type='submit'>log in</Button>
        </Form>
      </div>
    )

    const blogForm = () => (
      <div>
        <Router>
          <div>
            <div>
              <Navigation user={this.state.user} logOut={this.logOut} />
              <Route exact path="/" render={() => <BlogList />} />
              <Route path="/create" render={({ history }) => <BlogForm history={history} handleSubmit={this.addBlog} />} />
              <Route exact path="/users" render={() => <UserList />} />
              <Route path="/blogs/:id" render={({ match }) => <Blog id={match.params.id} handleLike={this.addLike} />} />
              <Route path="/users/:id" render={({ match }) => <User id={match.params.id} />} />
            </div>
          </div>
        </Router>
      </div>
    )

    return (
      <Container>
        <Error message={this.state.error} />
        <Notification message={this.state.notification} />
        {this.state.user === null ?
          loginForm() :
          <div>
            {blogForm()}
          </div>
        }
      </Container>
    );
  }
}

export default connect(
  null,
  { setNotification, setError, usersInitialization, blogsInitialization }
)(App)
