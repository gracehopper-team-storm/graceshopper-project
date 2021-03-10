import axios from 'axios'
import history from '../history'

// Action Type
const UPDATE_CART = 'UPDATE_CART'
const COMPLETE_ORDER = 'COMPLETE_ORDER'

// Action Creator
const updatedCart = order => ({
  type: UPDATE_CART,
  order
})

const completedOrder = order => ({
  type: COMPLETE_ORDER,
  order
})

// Thunk
export const addProduct = (orderId, productId) => {
  return async dispatch => {
    try {
      const order = await axios.post(`/api/cart/${orderId}/${productId}`)
      dispatch(updatedCart(order.data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const findOrCreateCart = userId => async dispatch => {
  try {
    const activeOrder = await axios.get(`/api/cart/${userId}`)
    dispatch(updatedCart(activeOrder.data))
  } catch (error) {
    console.error(error)
  }
}

//remove connection between the product and order and return the updated products in the cart
export const deleteProduct = (orderId, productId) => async dispatch => {
  try {
    //getting array of object
    let productsInCart = await axios.delete(`api/cart/${orderId}/${productId}`)
    dispatch(updatedCart(productsInCart.data))
  } catch (error) {
    console.error(error)
  }
}

//PUT api/cart/product/:orderId/:productId
export const decrement = (orderId, productId) => async dispatch => {
  try {
    const {data} = await axios.put(`api/cart/product/${orderId}/${productId}`)
    dispatch(updatedCart(data))
  } catch (error) {
    console.log(error)
  }
}

export const completeOrder = orderId => {
  return async dispatch => {
    try {
      const order = await axios.put(`/api/cart/${orderId}`)
      dispatch(completedOrder(order))
      history.push('/checkout')
    } catch (error) {
      console.log(error)
    }
  }
}

// Initial State
const initialState = {}

// Reducer
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CART:
      return action.order
    case COMPLETE_ORDER:
      state = {}
      return state
    default:
      return state
  }
}

export default cartReducer
