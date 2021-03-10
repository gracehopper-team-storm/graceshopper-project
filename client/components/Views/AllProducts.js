import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getProducts} from '../../store/redux/allProducts'
import ReactPaginate from 'react-paginate'

class AllProducts extends React.Component {
  constructor() {
    super()
    this.state = {
      offset: 0,
      currentPage: 0,
      postPerPage: 10
    }
    this.handlePageClick = this.handlePageClick.bind(this)
  }
  componentDidMount() {
    this.props.getProducts()
  }

  comppnentDidUpdate() {}

  handlePageClick(e) {
    const selectedPage = e.selected
    this.setState({
      currentPage: selectedPage,
      offset: this.state.currentPage * this.state.postPerPage
    })
  }
  render() {
    const currentPosts = this.props.products.slice(
      this.state.offset,
      this.state.offset + this.state.postPerPage
    )
    let pageCount = Math.ceil(
      this.props.products.length / this.state.postPerPage
    )

    return (
      <div>
        <h1>Live Plants</h1>
        {currentPosts.map(product => {
          return (
            <div key={product.id}>
              <Link to={`/allproducts/${product.id}`}>
                <img src={product.image} width="300px" className="cardImg" />
              </Link>
              <h4>{product.name}</h4>
              <p>${product.price}</p>
            </div>
          )
        })}

        <ReactPaginate
          previousLabel="← Previous"
          nextLabel="Next →"
          pageCount={pageCount}
          onPageChange={this.handlePageClick}
          containerClassName="pagination"
          previousLinkClassName="pagination-link"
          nextLinkClassName="pagination-link"
          activeClassName="active"
        />
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
