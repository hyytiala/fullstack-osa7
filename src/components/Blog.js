import React from 'react'
import { Button } from 'semantic-ui-react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
  }

  addLike = (event) => {
    event.preventDefault()
    const id = this.props.blog.id
    const blogObject = {
      title: this.props.blog.title,
      author: this.props.blog.author,
      url: this.props.blog.url,
      likes: this.props.blog.likes + 1,
      user: this.props.blog.user._id
    }
    this.props.handleLike(blogObject, id)
  }

  render() {
    return (
      <div>
        <h1>{this.props.blog.title}</h1>
        <p>Author: {this.props.blog.author}</p>
        <p>URL: <a href={this.props.blog.url}>{this.props.blog.url}</a></p>
        <p>blog has {this.props.blog.likes} likes</p>
        <p><Button onClick={this.addLike}>like</Button></p>
      </div>
    )
  }
}


export default Blog