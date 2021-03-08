/* eslint-disable react/button-has-type */
import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {findOrCreateCart} from '../store/cart'
import {fetchProduct} from '../store/singleProduct'

class Cart extends React.Component {
  // componentDidMount() {
  //   this.props.findOrCreateCart(this.props.userId)
  // }
  render() {
    const products = this.props.order.map(elem => {
      fetchProduct(elem.productId)
    })
    console.log(products)
    return (
      <div id="cart">
        <h2>Cart</h2>
        <div id="order-container">
          {!products.length || products === undefined ? (
            <h3>Empty</h3>
          ) : (
            products.map(item => (
              <div key={item.id} id="item-container">
                <div id="item">
                  <img src={item.imageUrl} alt={item.name} />
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
                        this.props.increaseQuantity()
                      }}
                    />
                    {item.quantity}
                    <button
                      id="decrease"
                      onClick={() => {
                        this.props.decreaseQuantity()
                      }}
                    />
                    <button
                      id="delete-product"
                      onClick={() => {
                        this.props.deleteProduct()
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
    fetchProduct: productId => dispatch(fetchProduct(productId))
    // increaseQuantity: () => dispatch(increaseQuantity(orderId, productId)),
    // decreaseQuantity: () => dispatch(decreaseQuantity(orderId, productId)),
    // deleteProduct: () => dispatch(deleteProduct(orderId, productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)