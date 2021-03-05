import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getProducts} from '../store/allProducts'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  comppnentDidUpdate() {}

  render() {
    return (
      <div>
        <h1>Plant Babies</h1>
        {this.props.products.map(product => {
          return (
            <div key={product.id}>
              <Link to={`/allproperties/${product.id}`}>
                <img src={product.image} width="300px" />
              </Link>
              <h4>{product.name}</h4>
              <p>${product.price}</p>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.allProductsReducer
  }
}
const mapDispatch = dispatch => {
  return {
    getProducts: () => dispatch(getProducts())
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
