import React from 'react'
import { Menu } from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, NavLink
} from 'react-router-dom'

class Navigation extends React.Component {
  render() {

    const active = {
      fontWeight: 'bold',
      color: 'green'
    }
    return (
      <Menu inverted>
        <Menu.Item>
          <NavLink exact activeStyle={active} to="/">blogs</NavLink> &nbsp;
    </Menu.Item>
        <Menu.Item>
          <NavLink exact activeStyle={active} to="/create">create new</NavLink> &nbsp;
    </Menu.Item>
    <Menu.Item>
          <NavLink exact activeStyle={active} to="/users">users</NavLink> &nbsp;
    </Menu.Item>
      </Menu>
    )
  }
}


export default Navigation