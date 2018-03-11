import React from 'react'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { blogLike } from './../reducers/blogReducer'
import { setNotification } from './../reducers/notificationReducer'

class Blog extends React.Component {

  addLike = (blog) => {
    this.props.blogLike(blog)
  }

  render() {
    return (
      <div>
        <h1>{this.props.blog.title}</h1>
        <p>Author: {this.props.blog.author}</p>
        <p>URL: <a href={this.props.blog.url}>{this.props.blog.url}</a></p>
        <p>blog has {this.props.blog.likes} likes</p>
        <p><Button onClick={() => this.addLike(this.props.blog)}>like</Button></p>
      </div>
    )
  }
}


const mapStateToProps = (state, props) => {
  return {
    blog: state.blog.find(b => b.id === props.id)
  }
}

export default connect(
  mapStateToProps,
  { blogLike, setNotification }
)(Blog)