import React from 'react'
import {connect} from 'react-router-dom'

class SingleProduct extends React.Component {
  constructor() {
    super()
    //get info for product
  }
  componentDidMount() {}
  render() {
    return (
      <div>
        <div id="singleProd-image">
          <img />
        </div>
        <div id="singleProd-info">
          <h2>Plant Name</h2>
          <p>brief description of plant </p>

          {/* render add to cart button here  */}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {}
}
const mapDispatch = dispatch => {
  return {}
}

export default connect()(SingleProduct)
