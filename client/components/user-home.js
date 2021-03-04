import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {name} = props

  return (
    <div>
      <h3>Welcome, (name here){name}!</h3>
      <img
        src="https://c.i.etsystatic.com/19586643/r/il/afd3d5/2705948432/il_1588xN.2705948432_omh6.jpg"
        width="500px"
      />
      <h3>About Us</h3>
      <h4>Plants Make People Happy</h4>
      <p>
        This simple idea was the seed for what would become The Sill: a modern
        plant destination for the modern plant lover. Plants make us happier,
        healthier, more efficient and boost our creativity. They even clean the
        air we breathe. But all our modern city-living has us indoors a lot. So
        we thought: why not bring the outdoors in? We think everyone deserves to
        have their own personal plant oasis. And, we think finding your new
        plant should be, well, easy.
      </p>

      <h4>Welcome to Plant Parenthood</h4>
      <p>
        Take it from us, the plant category is difficult to navigate, especially
        as our shopping behaviors and expectations evolve. Our solution? Take
        the best parts of grandma’s garden supply center (the plants) and create
        a seamless shopping experience (without getting your hands too dirty).
        The Sill started exclusively online, delivering potted houseplants like
        pizza to doorsteps all over the U.S.A. In New York City, Los Angeles and
        San Francisco, our brick and mortar stores offer an escape from the
        concrete jungle, where we put our plants on display year-round and host
        weekly workshops. It’s quickly becoming everyone’s happy place. Every
        plant from The Sill comes with care information and the support of our
        team of knowledgable plant parents. Our goal is to make the experience
        of being a plant parent as wonderful as the plants themselves. We’re
        here to inspire confidence in the next generation of plant parents.
      </p>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    name: state.user.name
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
