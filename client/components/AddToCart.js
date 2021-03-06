import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {addProduct} from './../store/cart'

class AddToCart extends React.Component {
  componentDidMount() {
    console.log('PROPS', this.props.user)
  }

  render() {
    return (
      <div>
        <button>Add To Cart</button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {}
}

export default connect(mapState, mapDispatch)(AddToCart)
