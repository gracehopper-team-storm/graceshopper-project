import React from 'react'
import {connect} from 'react-redux'
import {addProduct} from '../../store/redux/cart'

const IncrementButton = props => {
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          props.incrementProduct(props.orderId, props.product.id)
        }}
      >
        Increment
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
