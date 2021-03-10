import React from 'react'
import {connect} from 'react-redux'
import {deleteProduct} from '../../store/redux/cart'

const DeleteButton = props => {
  return (
    <div className="delete">
      <button
        type="button"
        className="btn btn-outline-dark"
        onClick={() => {
          props.delete(props.orderId, props.product.id)
        }}
      >
        Delete
      </button>
    </div>
  )
}

const mapState = state => ({
  user: state.user,
  orderId: state.cartReducer.orderId
})

const mapDispatch = dispatch => ({
  delete: (orderId, productId) => dispatch(deleteProduct(orderId, productId))
})

export default connect(mapState, mapDispatch)(DeleteButton)
