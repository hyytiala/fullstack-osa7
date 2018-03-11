import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

class Notification extends React.Component {
  render() {
    const style = {
      margin: '10px'
    }
    return (
      <div style={style} >
        {this.props.notification.message &&
          <Message success >{this.props.notification.message}</Message>}
      </div>
    )
  }
}

export default connect(
  (state) => ({ notification: state.notification })
)(Notification)