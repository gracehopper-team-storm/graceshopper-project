//action type
const ADD_GUEST_PRODUCT = 'ADD_GUEST_PRODUCT'
const REMOVE_GUEST_PRODUCT = 'REMOVE_GUEST_PRODUCT'
const GET_GUEST_CART = 'GET_GUEST_CART'

//ACTION CREATORs
export const addProduct = product => ({
  type: ADD_GUEST_PRODUCT,
  product
})

export const removeProduct = product => ({
  type: REMOVE_GUEST_PRODUCT,
  product
})

export const gotCart = cart => ({
  type: GET_GUEST_CART,
  cart
})

export const increaseQuantity = product => ({
  type: INCREMENT_GUEST_PRODUCT,
  product
})

const initialState = []

//reducer
const localCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_GUEST_PRODUCT:
      action.product.quantity = 1
      console.log('ADDING PROD', action.product)
      return [...state, action.product]
    case GET_GUEST_CART:
      return action.cart
    case REMOVE_GUEST_PRODUCT:
      return state.filter(product => product !== action.product)
    default:
      return state
  }
}

export default localCartReducer
