import blogService from '../services/blogs'

const reducer = (store = [], action) => {
  switch (action.type) {
    case 'LIKE':
      const old = store.filter(b => b.id !== action.id)
      const liked = store.find(b => b.id === action.id)
      return [...old, { ...liked, likes: liked.likes + 1 }]
    case 'CREATE':
      return [...store, action.data]
    case 'INIT_BLOGS':
      return action.data
    default:
      return store
  }
}

export const blogsInitialization = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const blogCreation = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'CREATE',
      data: newBlog
    })
  }
}

export const blogLike = (blog) => {
  const likedBlog = { ...blog, likes: blog.likes + 1 }
  return async (dispatch) => {

    const updated = await blogService.update(blog.id, likedBlog)
    dispatch({
      type: 'LIKE',
      id: updated.id
    })
  }
}

export default reducer