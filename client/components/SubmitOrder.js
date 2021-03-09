/* eslint-disable react/button-has-type */
import React from 'react'
import {connect} from 'react-redux'
import {completeOrder} from '../store/cart'

class SubmitOrder extends React.Component {
  handleSubmit(event) {
    event.preventDefault()
    this.props.completeOrder()
  }
  render() {
    return (
      <div>
        <button id="submit" onClick={() => this.handleSubmit()}>
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
    completeOrder: () => dispatch(completeOrder())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitOrder)
