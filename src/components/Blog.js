import React from 'react'

const Blog = ({ blog, onClick }) => (
  <div>
      <p>Title: {blog.title}</p>
      <p>Author: {blog.author}</p>
      <p>URL: {blog.url}</p>
      <p>blog has {blog.likes} likes</p>
      <p><button onClick={onClick}>like</button></p>
  </div>
)

export default Blog