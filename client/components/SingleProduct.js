import React from 'react'
import {connect} from 'react-redux'
import {addProduct} from '../store/localCart'
import {fetchProduct} from '../store/singleProduct'
import AddToCart from './AddToCart'

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id)
  }
  render() {
    const product = this.props.product
    const user = this.props.user ? this.props.user : {}
    return (
      <div>
        <div id="singleProd-image">
          <img src={product.image} />
        </div>
        <div id="singleProd-info">
          <h2>{product.name}</h2>
          <h2>{product.price}</h2>
          <p>{product.description}</p>

          {!user.id ? (
            <button
              onClick={() => {
                console.log('adding from single prod')
                console.log('product', product)
                this.props.addProduct(product)
              }}
            >
              Add To Cart
            </button>
          ) : (
            <AddToCart
              productId={this.props.match.params.id}
              userId={this.props.user}
            />
          )}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    product: state.singleProductReducer,
    user: state.user
  }
}
const mapDispatch = dispatch => {
  return {
    getProduct: id => dispatch(fetchProduct(id)),
    addProduct: product => dispatch(addProduct(product))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
