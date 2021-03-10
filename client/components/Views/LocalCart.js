/* eslint-disable react/button-has-type */
import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  increaseQuantity,
  decreaseQuantity,
  deleteProduct
} from '../../store/redux/localCart'

class LocalCart extends React.Component {
  render() {
    const products = this.props.order ? this.props.order : []
    console.log('products', products)

    return (
      <div id="cart">
        <h2>Cart</h2>
        <div id="order-container">
          {products.length > 0 ? (
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
                        this.props.increaseQuantity(item.id)
                      }}
                    >
                      +
                    </button>
                    {item.quantity}
                    <button
                      id="decrease"
                      onClick={() => {
                        this.props.decreaseQuantity(item.id)
                      }}
                    >
                      -
                    </button>
                    <button
                      id="delete-product"
                      onClick={() => {
                        this.props.deleteProduct(item.id)
                      }}
                    >
                      Delete Item
                    </button>
                  </form>
                </div>
              </div>
            ))
          ) : (
            <h3>Empty Cart</h3>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    order: state.localCartReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    increaseQuantity: productId => dispatch(increaseQuantity(productId)),
    decreaseQuantity: productId => dispatch(decreaseQuantity(productId)),
    deleteProduct: productId => dispatch(deleteProduct(productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocalCart)
