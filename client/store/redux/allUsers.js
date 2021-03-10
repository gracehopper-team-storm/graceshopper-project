import axios from 'axios'

//ACTION TYPES

const GET_USERS = 'GET_USERS'

//ACTION CREATORS

const getUsers = users => ({type: GET_USERS, users})

//THUNKS

export const fetchUsers = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/users/')
    dispatch(getUsers(data))
  } catch (error) {
    console.error(error)
  }
}

//INITIAL STATE
const initialState = []

//REDUCER

export default function allUsersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return [...action.users]
    default:
      return state
  }
}
