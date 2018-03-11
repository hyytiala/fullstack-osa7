import userService from '../services/users'

const reducer = (store = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data
    default:
      return store
  }
}

export const usersInitialization = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}


export default reducer