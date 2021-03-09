import React from 'react'
import {connect} from 'react-redux'
import {addProduct, findOrCreateCart} from './../store/cart'

class AddToCart extends React.Component {
  componentDidMount() {
    this.props.getCart(this.props.user.id)
  }

  render() {
    return (
      <div>
        <button
          type="button"
          onClick={() =>
            this.props.addProduct(this.props.cart.orderId, this.props.productId)
          }
        >
          Add To Cart
        </button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    cart: state.cartReducer
  }
}

const mapDispatch = dispatch => {
  return {
    addProduct: (orderId, productId) =>
      dispatch(addProduct(orderId, productId)),
    getCart: userId => dispatch(findOrCreateCart(userId))
  }
}

export default connect(mapState, mapDispatch)(AddToCart)
