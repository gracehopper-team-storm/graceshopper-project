import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class AllProducts extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <h1>All Products working!</h1>
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

export default connect()(AllProducts)
