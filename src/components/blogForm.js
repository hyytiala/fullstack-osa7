import React from 'react'
import { Form, Button } from 'semantic-ui-react'

class BlogForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      url: ''
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }
    this.setState({
      title: '',
      author: '',
      url: ''
    })
    this.props.handleSubmit(blogObject)
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <h2>Add new Blog</h2>
        <Form onSubmit={this.addBlog}>
          <Form.Field>
            <label>Title</label>
            <input
              name='title'
              value={this.state.title}
              onChange={this.handleLoginFieldChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Author</label>
            <input
              name='author'
              value={this.state.author}
              onChange={this.handleLoginFieldChange}
            />
          </Form.Field>
          <Form.Field>
            <label>URL</label>
            <input
              name='url'
              value={this.state.url}
              onChange={this.handleLoginFieldChange}
            />
          </Form.Field>
          <Button type='submit'>Save</Button>
        </Form>
      </div>
    )
  }
}

export default BlogForm