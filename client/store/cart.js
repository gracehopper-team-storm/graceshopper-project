import axios from 'axios'

// Action Type
const ADD_PRODUCT = 'ADD_PRODUCT'
const CREATE_CART = 'CREATE_CART'

// Action Creator
const addedProduct = order => ({
  type: ADD_PRODUCT,
  order
})

const createCart = activeOrder => ({
  type: CREATE_CART,
  activeOrder
})

// Thunk
export const addProduct = (orderId, productId) => {
  return async dispatch => {
    try {
      const order = await axios.put(
        `/api/cart/addproduct/${orderId}/${productId}`
      )
      console.log('ORDER', order)
      dispatch(addedProduct(order.data))
    } catch (error) {
      console.log('ERROR')
      console.error(error)
    }
  }
}

export const findOrCreateCart = userId => async dispatch => {
  try {
    const activeOrder = await axios.get(`/api/cart/${userId}`)
    dispatch(createCart(activeOrder.data))
  } catch (error) {
    console.error(error)
  }
}

// Initial State
let initialState = []

// Reducer
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      console.log('ACTION', action.order)
      return action.order
    case CREATE_CART:
      return action.activeOrder
    default:
      return state
  }
}

export default cartReducer
