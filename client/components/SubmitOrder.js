/* eslint-disable react/button-has-type */
import React from 'react'
import {connect} from 'react-redux'
import {completeOrder, findOrCreateCart} from '../store/cart'

class SubmitOrder extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    this.props.completeOrder(this.props.order.orderId)
  }
  render() {
    return (
      <div>
        <button id="submit" onClick={this.handleClick}>
          Submit Order
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    order: state.cartReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    completeOrder: orderId => dispatch(completeOrder(orderId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitOrder)
