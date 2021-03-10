import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../../store/redux/allUsers'

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
    <div className="container-sm">
      <table className="table">
        <thead className="tableHead">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        {users.map(user => (
          // <div className="userList" key={user.id}>
          <tbody>
            <tr>
              <th scope="row">{user.id}</th>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
            </tr>
          </tbody>
          // </div>
        ))}
      </table>
    </div>
  ) : (
    // </div>
    <h3>Getting users...</h3>
  )
}

const mapState = state => ({
  users: state.allUsersReducer
})

const mapDispatch = dispatch => ({
  getUsers: () => dispatch(fetchUsers())
})

export default connect(mapState, mapDispatch)(UserList)
