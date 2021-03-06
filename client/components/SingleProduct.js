import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/singleProduct'
import AddToCart from './AddToCart'
class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id)
  }
  render() {
    const product = this.props.product
    return (
      <div>
        <div id="singleProd-image">
          <img src={product.image} />
        </div>
        <div id="singleProd-info">
          <h2>{product.name}</h2>
          <h2>{product.price}</h2>
          <p>{product.description}</p>

          <AddToCart />
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    product: state.singleProductReducer
  }
}
const mapDispatch = dispatch => {
  return {
    getProduct: id => dispatch(fetchProduct(id))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
