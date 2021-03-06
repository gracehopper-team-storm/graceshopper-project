import React from 'react'
import {connect} from 'react-redux'
import {addProduct} from '../../store/redux/localCart'
import {fetchProduct} from '../../store/redux/singleProduct'
import AddToCart from '../Buttons/AddToCart'

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id)
  }
  render() {
    const product = this.props.product
    const user = this.props.user ? this.props.user : {}
    return (
      <div>
        <div className="single">
          <h2>{product.name}</h2>
          <div>
            <img src={product.image} width="500px" />
          </div>
          <p>{product.description}.</p>
          <h3>${product.price}</h3>

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
              userId={this.props.user.id}
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
