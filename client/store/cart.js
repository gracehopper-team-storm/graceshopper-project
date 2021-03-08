import axios from 'axios'

// Action Type
const ADD_PRODUCT = 'ADD_PRODUCT'
const CREATE_CART = 'CREATE_CART'
const DELETE_PRODUCT = 'DELETE_PRODUCT'

// Action Creator
const addedProduct = order => ({
  type: ADD_PRODUCT,
  order
})

const createCart = activeOrder => ({
  type: CREATE_CART,
  activeOrder
})

const deletedProduct = productsInCart => ({
  type: DELETE_PRODUCT,
  productsInCart
})

// Thunk
export const addProduct = (orderId, productId) => {
  return async dispatch => {
    try {
      const order = await axios.put(
        `/api/cart/addproduct/${orderId}/${productId}`
      )
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
      `api/cart/addproduct/${orderId}/${productId}`
    )

    dispatch(deletedProduct(productsInCart))
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
      return [...state, action.order]
    case CREATE_CART:
      return action.activeOrder[0]
    case DELETE_PRODUCT:
      return action.productsInCart
    default:
      return state
  }
}

export default cartReducer
