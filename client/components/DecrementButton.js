import React from 'react'
import {connect} from 'react-redux'
import {decrement} from '../store/cart'

// I recommend restructuring the components folder with subfolders. For example, you could have a "buttons" folder

const DecrementButton = props => {
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          props.decrementProduct(props.orderId, props.product.id)
        }}
      >
        Decrement
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
