/* eslint-disable react/button-has-type */
import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {findOrCreateCart} from '../store/cart'

class Cart extends React.Component {
  componentDidMount() {
    console.log('ORDER', this.props.order)
    console.log('PROPS', this.props)
    console.log('USER ID', this.props.userId)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.userId !== prevProps.userId) {
      this.props.findOrCreateCart(this.props.userId)
    }
  }

  render() {
    const products = this.props.order.products ? this.props.order.products : []
    const orderId = this.props.order.id
    console.log('products', products)

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
                  <form>
                    <button
                      id="increase"
                      onClick={() => {
                        this.props.increaseQuantity(orderId, item.id)
                      }}
                    />
                    {item.quantity}
                    <button
                      id="decrease"
                      onClick={() => {
                        this.props.decreaseQuantity(orderId, item.id)
                      }}
                    />
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
    fetchProduct: productId => dispatch(fetchProduct(productId)),
    increaseQuantity: () => dispatch(increaseQuantity(orderId, productId)),
    decreaseQuantity: () => dispatch(decreaseQuantity(orderId, productId)),
    deleteProduct: () => dispatch(deleteProduct(orderId, productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
