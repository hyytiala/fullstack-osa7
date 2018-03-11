import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { blogCreation } from './../reducers/blogReducer'
import { setNotification } from './../reducers/notificationReducer'
import { connect } from 'react-redux'

class BlogForm extends React.Component {

  addBlog = (e) => {
    e.preventDefault()
    const blogObject = {
      title: e.target.title.value,
      author: e.target.author.value,
      url: e.target.url.value
    }
    e.target.title.value = ''
    e.target.author.value = ''
    e.target.url.value = ''
    this.props.blogCreation(blogObject)
    this.props.setNotification(`Blog ${blogObject.title} by ${blogObject.author} added`, 5)
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
            />
          </Form.Field>
          <Form.Field>
            <label>Author</label>
            <input
              name='author'
            />
          </Form.Field>
          <Form.Field>
            <label>URL</label>
            <input
              name='url'
            />
          </Form.Field>
          <Button type='submit'>Save</Button>
        </Form>
      </div>
    )
  }
}

export default connect(
  null,
  { blogCreation, setNotification }
)(BlogForm)