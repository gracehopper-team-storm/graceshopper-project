/* eslint-disable react/button-has-type */
import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import LocalCart from './LocalCart'
import DeleteButton from '../Buttons/DeleteButton'
import IncrementButton from '../Buttons/IncrementButton'
import DecrementButton from '../Buttons/DecrementButton'
import {findOrCreateCart} from '../../store/redux/cart'
import SubmitOrder from '../Buttons/SubmitOrder'

class Cart extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      this.props.findOrCreateCart(this.props.userId)
    }
    if (!this.props.order.products && prevProps.order.products) {
      this.props.findOrCreateCart(this.props.userId)
    }
  }

  render() {
    const products = this.props.order.products ? this.props.order.products : []
    const userId = this.props.userId

    return userId ? (
      <div className="cart">
        <h2>Cart</h2>
        <div>
          {!products.length || products === undefined ? (
            <p>Nothing to show up here.</p>
          ) : (
            products.map(item => (
              <div key={item.id} id="item-container">
                {/* <div className="product"> */}
                <Link to={`/allproducts/${item.id}`}>
                  <img src={item.image} alt={item.name} width="200px" />
                </Link>
                <h6>{item.name}</h6>
                <div className="price">${item.price}</div>
                {/* </div> */}
                {/* <div> */}

                <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3 w-25">
                  <DecrementButton product={item} />
                  <h6 className="productQuantity">
                    {item.Order_Product.quantity}
                  </h6>
                  <IncrementButton product={item} />
                </div>

                <DeleteButton product={item} />
                {/* </div> */}
              </div>
            ))
          )}
        </div>
        <SubmitOrder />
      </div>
    ) : (
      <div>
        <LocalCart />
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
