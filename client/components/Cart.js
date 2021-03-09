/* eslint-disable react/button-has-type */
import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {completeOrder, findOrCreateCart} from '../store/cart'
import SubmitOrder from './SubmitOrder'

class Cart extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    if (this.props.userId !== prevProps.userId) {
      this.props.findOrCreateCart(this.props.userId)
    }
  }

  render() {
    const products = this.props.order.products ? this.props.order.products : []
    const orderId = this.props.order.id
    const quantity = this.props.order.products[0].Order_Product.quantity

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
                  <Link to={`/allproducts/${item.id}`}>
                    <img src={item.image} alt={item.name} width="200px" />
                  </Link>
                  <h5>{item.name}</h5>
                  <h5>{item.price}</h5>
                </div>
                <div id="quantity-change">
                  <form>
                    <button
                      id="increase"
                      onClick={() => {
                        this.props.increaseQuantity(orderId, item.id)
                      }}
                    >
                      +
                    </button>
                    <div>{quantity}</div>
                    {item.quantity}
                    <button
                      id="decrease"
                      onClick={() => {
                        this.props.decreaseQuantity(orderId, item.id)
                      }}
                    >
                      -
                    </button>
                    <button
                      id="delete-product"
                      onClick={() => {
                        this.props.deleteProduct(orderId, item.id)
                      }}
                    >
                      Delete Item
                    </button>
                  </form>
                </div>
              </div>
            ))
          )}
        </div>
        <SubmitOrder />
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
    findOrCreateCart: userId => dispatch(findOrCreateCart(userId)),
    completeOrder: orderId => dispatch(completeOrder(orderId)),
    increaseQuantity: () => dispatch(increaseQuantity(orderId, productId)),
    decreaseQuantity: () => dispatch(decreaseQuantity(orderId, productId)),
    deleteProduct: () => dispatch(deleteProduct(orderId, productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
