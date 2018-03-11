import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

class Error extends React.Component {
  render() {
    const style = {
      margin: '10px'
    }
    return (
      <div style={style} >
        {this.props.notification.error &&
          <Message negative >{this.props.notification.error}</Message>}
      </div>
    )
  }
}

export default connect(
  (state) => ({ notification: state.notification })
)(Error)