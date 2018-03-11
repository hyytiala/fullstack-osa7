import React from 'react'
import Notification from './components/Notification'
import Error from './components/Error'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/blogForm'
import Togglable from './components/Togglable'
import TogglableBlog from './components/TogglableBlog'
import { setNotification, setError } from './reducers/notificationReducer'
import { usersInitialization } from './reducers/userReducer'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Navigation from './components/Menu'
import UserList from './components/UserList'
import User from './components/User'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, NavLink
} from 'react-router-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null
    }
  }

  componentDidMount = async () => {
    const blogs = await blogService.getAll()
    this.setState({ blogs })
    await this.props.usersInitialization()
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  sortList(a, b) {
    return b.likes - a.likes
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  addBlog = async (blog) => {
    try {
      const savedBlog = await blogService.create(blog)
      this.setState({ blogs: this.state.blogs.concat(savedBlog) })
      this.props.setNotification(`Blog ${savedBlog.title} by ${savedBlog.author} added`, 5)
    } catch (error) {
      console.log(error)
      this.props.setError('Something went wrong', 5)
    }

  }

  removeBlog = async (id) => {
    try {
      await blogService.remove(id)
      this.setState({
        blogs: this.state.blogs.filter(blog => blog.id !== id)
      })
    } catch (error) {
      console.log(error)
      this.props.setError('Something went wrong', 5)
    }
  }

  addLike = async (blog, id) => {
    try {
      const updatedBlog = await blogService.update(id, blog)
      this.setState({
        blogs: this.state.blogs.map(blog => blog.id !== id ? blog : updatedBlog)
      })
    } catch (error) {
      console.log(error)
      this.props.setError('Something went wrong', 5)
    }
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

  blogById = (id) => {
    return this.state.blogs.find(b => b.id === id)
  }

  render() {
    const loginForm = () => (
      <div>
        <h2>Log in please</h2>

        <form onSubmit={this.login}>
          <div>
            Username
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            Password
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button>log in</button>
        </form>
      </div>
    )

    const blogForm = () => (
      <div>
        <Router>
          <div>
            <div>
              <Navigation />
              <Route exact path="/" render={() => <BlogList blogs={this.state.blogs} />} />
              <Route path="/create" render={({ history }) => <BlogForm history={history} handleSubmit={this.addBlog} />} />
              <Route exact path="/users" render={() => <UserList />} />
              <Route path="/blogs/:id" render={({ match }) => <Blog blog={this.blogById(match.params.id)} />} />
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
            <p>{this.state.user.name} logged in <button onClick={this.logOut}>Log Out</button></p>
            {blogForm()}
          </div>
        }
      </Container>
    );
  }
}

export default connect(
  null,
  { setNotification, setError, usersInitialization }
)(App)
