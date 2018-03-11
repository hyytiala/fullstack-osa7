import React from 'react'
import { connect } from 'react-redux'
import { Table, Container } from 'semantic-ui-react'
import { setNotification } from './../reducers/notificationReducer'
import { Link } from 'react-router-dom'

class UserList extends React.Component {


  render() {
    return (
      <Container>
        <h2>Users</h2>
        <Table striped celled>
        <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Full name</Table.HeaderCell>
          <Table.HeaderCell>Username</Table.HeaderCell>
          <Table.HeaderCell>Amount of blogs</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
          <Table.Body>
            {this.props.users.map(user =>
              <Table.Row key={user.id} >
                <Table.Cell><Link to={`/users/${user.id}`}>{user.name}</Link></Table.Cell>
                <Table.Cell>{user.username}</Table.Cell>
                <Table.Cell>{user.blogs.length}</Table.Cell>
              </Table.Row>)}
          </Table.Body>
        </Table>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.user
  }
}


export default connect(
  mapStateToProps,
  { setNotification }
)(UserList)