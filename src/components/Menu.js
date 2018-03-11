import React from 'react'
import { Menu, Button } from 'semantic-ui-react'
import {
  NavLink
} from 'react-router-dom'

class Navigation extends React.Component {
  render() {

    const active = {
      fontWeight: 'bold',
      color: 'green'
    }
    return (
      <Menu stackable>
        <Menu.Item>
          <NavLink exact activeStyle={active} to="/">blogs</NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink exact activeStyle={active} to="/create">create new</NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink exact activeStyle={active} to="/users">users</NavLink>
        </Menu.Item>
        <Menu.Item position='right'>
          {this.props.user.name} logged in
        </Menu.Item>
        <Menu.Item position='right'>
          <Button onClick={this.props.logOut}>Log Out</Button>
        </Menu.Item>
      </Menu>
    )
  }
}


export default Navigation