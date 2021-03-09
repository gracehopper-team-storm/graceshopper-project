/* eslint-disable react/button-has-type */
import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class OrderConfirmation extends React.Component {
  //   componentDidUpdate(prevProps, prevState) {
  //     if (this.props.userId !== prevProps.userId) {
  //       this.props.findOrCreateCart(this.props.userId)
  //     }
  //   }

  render() {
    var myDate = new Date()
    let daysList = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ]
    let monthsList = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Aug',
      'Oct',
      'Nov',
      'Dec'
    ]

    let date = myDate.getDate()
    let month = monthsList[myDate.getMonth()]
    let year = myDate.getFullYear()
    let day = daysList[myDate.getDay()]
    let today = `${month} ${date}, ${year}`

    console.log(this.props.user)

    return (
      <div>
        <h3>Thank you for your order!</h3>

        <h5>Order Confirmation: </h5>
        <h6>{today}</h6>

        <h5>Order Total</h5>
        <h6>Subtotal price:</h6>
        <h6>Discounts:</h6>
        <h6>Shipping price:</h6>

        <h5>Total Price:</h5>

        {/* <h5>Billing</h5>
        <h5>Shipping</h5> */}

        <h6>View Order</h6>
      </div>
    )
  }
}

const mapState = state => {
  return {
    order: state.cartReducer,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {}
}
export default connect(mapState, mapDispatch)(OrderConfirmation)
