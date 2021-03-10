import React from 'react'
import {connect} from 'react-redux'
import {decrement} from '../../store/redux/cart'

const DecrementButton = props => {
  return (
    <div className="decrement">
      <button
        type="button"
        className="btn btn-outline-dark"
        onClick={() => {
          props.decrementProduct(props.orderId, props.product.id)
        }}
      >
        -
      </button>
    </div>
  )
}

const mapState = state => ({
  user: state.user,
  orderId: state.cartReducer.orderId
})

const mapDispatch = dispatch => ({
  decrementProduct: (orderId, productId) => {
    dispatch(decrement(orderId, productId))
  }
})

export default connect(mapState, mapDispatch)(DecrementButton)
