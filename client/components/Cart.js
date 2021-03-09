/* eslint-disable react/button-has-type */
import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {findOrCreateCart} from '../store/cart'
import DeleteButton from './DeleteButton'
import IncrementButton from './IncrementButton'
import DecrementButton from './DecrementButton'

class Cart extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    if (this.props.userId !== prevProps.userId) {
      this.props.findOrCreateCart(this.props.userId)
    }
    if (!this.props.order.products && prevProps.order.products) {
      this.props.findOrCreateCart(this.props.userId)
    }
  }

  render() {
    const products = this.props.order.products ? this.props.order.products : []
    const orderId = this.props.order.id

    return (
      <div id="cart">
        <h2>Cart</h2>
        <div id="order-container">
          {!products.length || products === undefined ? (
            <h3>Empty Cart</h3>
          ) : (
            products.map(item => (
              <div key={item.id} id="item-container">
                <div id="item">
                  <img src={item.image} alt={item.name} />
                  <Link to={`/allproducts/${item.id}`}>
                    <h4>{item.name}</h4>
                  </Link>
                  <h5>{item.price}</h5>
                </div>
                <div id="quantity-change">
                  <h5>{item.Order_Product.quantity}</h5>
                  <IncrementButton product={item} />
                  <DecrementButton product={item} />
                  <DeleteButton product={item} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    order: state.cartReducer,
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    findOrCreateCart: userId => dispatch(findOrCreateCart(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
