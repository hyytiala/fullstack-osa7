import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    console.log(this.props.notification.message)
    return (
      <div >
        {this.props.notification.message &&
          <div className="notification">
            {this.props.notification.message}
          </div>}
      </div>
    )
  }
}

export default connect(
  (state) => ({ notification: state.notification })
)(Notification)