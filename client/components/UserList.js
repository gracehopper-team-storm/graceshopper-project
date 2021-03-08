import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../store/allUsers'

export const UserList = props => {
  let {users, getUsers} = props

  useEffect(
    () => {
      if (getUsers) {
        getUsers()
      }
    },
    [getUsers]
  )

  return users.length > 0 ? (
    users.map(user => (
      <div key={user.id}>
        <h3>
          {user.firstName} {user.lastName}
        </h3>
        <p>{user.email}</p>
        <p>{user.id}</p>
      </div>
    ))
  ) : (
    <h3>Getting Users</h3>
  )
}

const mapState = state => ({
  users: state.allUsersReducer
})

const mapDispatch = dispatch => ({
  getUsers: () => dispatch(fetchUsers())
})

export default connect(mapState, mapDispatch)(UserList)
