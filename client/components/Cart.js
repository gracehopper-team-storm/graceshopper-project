/* eslint-disable react/button-has-type */
import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Cart extends React.Component {
  render() {
    const {order} = this.props
    return (
      <div id="cart">
        <h2>Cart</h2>
        <div id="order-container">
          {!order.length || order === undefined ? (
            <h3>Empty</h3>
          ) : (
            order.map(item => (
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
                        this.props.increaseQuantity(order.id, item.id)
                      }}
                    />
                    {item.quantity}
                    <button
                      id="decrease"
                      onClick={() => {
                        this.props.decreaseQuantity(order.id, item.id)
                      }}
                    />
                    <button
                      id="delete-product"
                      onClick={() => {
                        this.props.deleteProduct(order.id, item.id)
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
    order: state.order
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrder: () => dispatch(getOrder()),
    increaseQuantity: () => dispatch(increaseQuantity(orderId, productId)),
    decreaseQuantity: () => dispatch(decreaseQuantity(orderId, productId)),
    deleteProduct: () => dispatch(deleteProduct(orderId, productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
