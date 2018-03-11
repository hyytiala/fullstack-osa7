import React from 'react'
import { connect } from 'react-redux'

class Error extends React.Component {
  render() {
    console.log(this.props.notification.error)
    return (
      <div >
        {this.props.notification.error &&
          <div className="error">
            {this.props.notification.error}
          </div>}
      </div>
    )
  }
}

export default connect(
  (state) => ({ notification: state.notification })
)(Error)