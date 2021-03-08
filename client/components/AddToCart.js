import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {addProduct, findOrCreateCart} from './../store/cart'

class AddToCart extends React.Component {
  componentDidMount() {
    console.log('PROPS', this.props)
    console.log('ORDERID', this.props.orderId)
    console.log('STATE', this.props.state)

    this.props.cart(this.props.user.id)
  }

  render() {
    return (
      <div>
        <button
          onClick={() =>
            this.props.addProduct(
              this.props.state[0].orderId,
              this.props.productId
            )
          }
        >
          {/* <button> */}
          Add To Cart
        </button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    state: state.cartReducer
  }
}

const mapDispatch = dispatch => {
  return {
    addProduct: (orderId, productId) =>
      dispatch(addProduct(orderId, productId)),
    cart: userId => dispatch(findOrCreateCart(userId))
  }
}

export default connect(mapState, mapDispatch)(AddToCart)
