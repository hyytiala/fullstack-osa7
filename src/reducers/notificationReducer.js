const notificationAtStart = {
  message: null,
  error: null
}

const reducer = (store = notificationAtStart, action) => {
  switch (action.type) {
    case 'MESSAGE':
      return {message: action.message}
    case 'ERROR':
      return {error: action.error}
    case 'CLEAR':
      return notificationAtStart
    default:
      return store
  }
}

export const setNotification = (message, time) => {
  console.log('täällä')
  return (dispatch) => {
    dispatch({
      type: 'MESSAGE',
      message: message
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR'
      })
    }, time * 1000)
  }
}

export const setError = (message, time) => {
  console.log('täällä')
  return (dispatch) => {
    dispatch({
      type: 'ERROR',
      error: message
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR'
      })
    }, time * 1000)
  }
}

export default reducer