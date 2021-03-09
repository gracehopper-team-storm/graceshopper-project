import axios from 'axios'

// Action Type
const ADD_PRODUCT = 'ADD_PRODUCT'
const CREATE_CART = 'CREATE_CART'
const DECREMENT = 'DECREMENT'

// Action Creator
const addedProduct = order => ({
  type: ADD_PRODUCT,
  order
})

const createCart = activeOrder => ({
  type: CREATE_CART,
  activeOrder
})

const decremented = decrementedProduct => ({
  type: DECREMENT,
  decrementedProduct
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

//remove connection between the product and order and return the updated products in the cart
export const deleteProduct = (orderId, productId) => async dispatch => {
  try {
    //getting array of object
    let productsInCart = await axios.put(
      `api/cart/removeproduct/${orderId}/${productId}`
    )
    dispatch(createCart(productsInCart.data))
  } catch (error) {
    console.error(error)
  }
}

//PUT api/cart/decrementproduct/:orderId/:productId
export const decrement = (orderId, productId) => async dispatch => {
  try {
    const {data} = await axios.put(
      `api/cart/decrementproduct/${orderId}/${productId}`
    )
    dispatch(decremented(data))
    dispatch(createCart(data))
  } catch (error) {
    console.log(error)
  }
}

// Initial State
let initialState = {}

// Reducer
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return action.order
    case CREATE_CART:
      return action.activeOrder
    case DECREMENT:
      console.log('decrement reducer', action.decrementedProduct)
      return action.decrementedProduct
    default:
      return state
  }
}

export default cartReducer
