import React from 'react'
import {connect} from 'react-redux'
import {addProduct} from '../store/cart'

const IncrementButton = props => {
  return (
    <div className="increment">
      <button
        type="button"
        className="btn btn-outline-dark"
        onClick={() => {
          props.incrementProduct(props.orderId, props.product.id)
        }}
      >
        +
      </button>
    </div>
  )
}

const mapState = state => ({
  user: state.user,
  orderId: state.cartReducer.orderId
})

const mapDispatch = dispatch => ({
  incrementProduct: (orderId, productId) => {
    dispatch(addProduct(orderId, productId))
  }
})

export default connect(mapState, mapDispatch)(IncrementButton)
