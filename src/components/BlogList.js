import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from './../reducers/notificationReducer'
import { Table } from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, NavLink
} from 'react-router-dom'

class BlogList extends React.Component {


  render() {
    console.log(this.props.blogs)
    return (
      <Table striped celled>
        <Table.Body>

          {this.props.blogs.map(blog =>
            <Table.Row key={blog.id} >
              <Table.Cell><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></Table.Cell>
              <Table.Cell>{blog.author}</Table.Cell>
            </Table.Row>)}

        </Table.Body>
      </Table>
    )
  }
}


export default connect(
  null,
  { setNotification }
)(BlogList)