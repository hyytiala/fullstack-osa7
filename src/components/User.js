import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'

const BlogTable = ({ blogs }) => (
  <div>
    <h2>Added blogs</h2>
    <Table striped celled>
      <Table.Body>
        {blogs.map(blog =>
          <Table.Row key={blog._id} >
            <Table.Cell>{blog.title}</Table.Cell>
            <Table.Cell>{blog.author}</Table.Cell>
          </Table.Row>)}

      </Table.Body>
    </Table>
  </div>
)

class User extends React.Component {



  render() {
    return (
      <div>
        <h1>{this.props.user.name}</h1>
        {this.props.user.blogs.length === 0 ||
          <BlogTable blogs={this.props.user.blogs} />}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: state.user.find(u => u.id === props.id)
  }
}


export default connect(
  mapStateToProps,
  null
)(User)