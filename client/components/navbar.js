import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, isAdmin, cart}) => {
  const products = cart.products ? cart.products : []

  return (
    <div className="frontPageText">
      <h1 id="brandName">Plant Parenthood</h1>
      <nav className="navbar navbar-expand-lg">
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <Link to="/allproducts">Shop All</Link>
            {isAdmin ? <Link to="/allusers">User List</Link> : ''}
            <Link to="/cart">
              <FontAwesomeIcon icon={faShoppingCart} />
            </Link>
            {products.map(product => {
              let q = 0
              q += product.Order_Product.quantity
              console.log(q)
            })}
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/home">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/allproducts">Shop All</Link>
            <Link to="/cart">
              {products.map(product => {
                let q = 0
                q += product.Order_Product.quantity
                console.log(q)
              })}
              <FontAwesomeIcon icon={faShoppingCart} />
            </Link>
          </div>
        )}
      </nav>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin,
    cart: state.cartReducer
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
}
