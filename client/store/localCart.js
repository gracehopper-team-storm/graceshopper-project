//action type
const ADD_PRODUCT = 'ADD_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const GET_CART = 'GET_CART'

//ACTION CREATORs
const addProduct = product => ({
  type: ADD_PRODUCT,
  product
})

const removeProduct = product => ({
  type: REMOVE_PRODUCT,
  product
})

const gotCart = cart => ({
  type: GET_CART,
  cart
})

const initialState = []

//reducer
const localCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return [...state, action.product]
    case GET_CART:
      return action.cart
    case REMOVE_PRODUCT:
      return state.filter(product => product !== action.product)
    default:
      return state
  }
}

// saveState(localCartReducer)

export default localCartReducer
