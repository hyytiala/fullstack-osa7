import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from './../reducers/notificationReducer'
import { Table, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class BlogList extends React.Component {
  render() {
    console.log(this.props.blogs)
    return (
      <Container>
        <h2>Blogs</h2>
        <Table striped celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Author</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.blogs.map(blog =>
              <Table.Row key={blog.id} >
                <Table.Cell><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></Table.Cell>
                <Table.Cell>{blog.author}</Table.Cell>
              </Table.Row>)}
          </Table.Body>
        </Table>
      </Container>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    blogs: state.blog
  }
}

export default connect(
  mapStateToProps,
  { setNotification }
)(BlogList)