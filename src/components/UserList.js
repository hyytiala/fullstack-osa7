import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'
import { setNotification } from './../reducers/notificationReducer'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, NavLink
} from 'react-router-dom'

class UserList extends React.Component {


  render() {
    console.log(this.props.users)
    return (
      <Table striped celled>
        <Table.Body>

          {this.props.users.map(user =>
            <Table.Row key={user.id} >
              <Table.Cell><Link to={`/user/${user.id}`}>{user.name}</Link></Table.Cell>
              <Table.Cell>{user.username}</Table.Cell>
            </Table.Row>)}

        </Table.Body>
      </Table>
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