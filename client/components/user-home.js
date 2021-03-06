import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {findOrCreateCart} from './../store/cart'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {name, isLoggedIn, getCart, userId} = props

  useEffect(() => {
    getCart(userId)
    console.log('from get cart')
  })

  return (
    <div>
      {isLoggedIn ? <h3>Welcome, {name}!</h3> : <h3>Welcome, Guest!</h3>}
      <img
        src="https://c.i.etsystatic.com/19586643/r/il/afd3d5/2705948432/il_1588xN.2705948432_omh6.jpg"
        width="500px"
      />
      <h3>About Us</h3>
      <h4>Plants Make People Happy</h4>
      <p>
        The idea behind (Website name here) is to enhance the lives of all
        modern plant lovers. Plants make us are not only companions, but they
        also hold a simbiotic relationship with us to make us healthier,
        increase our inspiration, and even more. In times of endless quarantine
        days, why not surround yourself all that supports you the most? So we
        thought: why not bring the outdoors in? Live is short not to have a
        plant oasis in the comfort of your home. It is simple, and it starts
        here.
      </p>

      <h4>Welcome to Plant Parenthood</h4>
      <Link to="/allproducts">Start your journey.</Link>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    name: state.user.firstName,
    userId: state.user.id,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    getCart: userId => dispatch(findOrCreateCart(userId))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
