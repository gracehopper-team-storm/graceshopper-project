import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../store/allUsers'

const UserList = props => {
  const {getUsers, users} = props
  console.log(users)
  useEffect(
    () => {
      if (getUsers) {
        getUsers()
      }
    },
    [getUsers]
  )

  return <div>hello</div>
  // {return 1 ? (
  //   users.map((user) => {
  //     <div>
  //       <h3>{user.firstName} {user.lastName}</h3>
  //       <p>{user.email}</p>
  //       <p>{user.id}</p>
  //     </div>
  //   })
  // ) : 'loading'}
}

const mapState = state => ({
  users: state.allUsersReducer
})

const mapDispatch = dispatch => ({
  getUsers: () => dispatch(fetchUsers())
})

export default connect(mapState, mapDispatch)(UserList)
