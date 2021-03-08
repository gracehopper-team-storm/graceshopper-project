import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {addProduct} from './../store/cart'

class AddToCart extends React.Component {
  componentDidMount() {
    console.log('PROPS', this.props)
    console.log('STATE', this.props.state)
  }

  render() {
    return (
      <div>
        <button
          onClick={() =>
            this.props.addProduct(this.props.state[0].id, this.props.productId)
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
    // orderId: state.cartReducer[0].id,
    state: state.cartReducer
  }
}

const mapDispatch = dispatch => {
  return {
    addProduct: (orderId, productId) => dispatch(addProduct(orderId, productId))
  }
}

export default connect(mapState, mapDispatch)(AddToCart)
