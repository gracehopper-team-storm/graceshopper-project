//action type
const ADD_GUEST_PRODUCT = 'ADD_GUEST_PRODUCT'
const REMOVE_GUEST_PRODUCT = 'REMOVE_GUEST_PRODUCT'
const GET_GUEST_CART = 'GET_GUEST_CART'
const INCREMENT_GUEST_PRODUCT = 'INCREMENT_GUEST_PRODUCT'
const DECREMENT_GUEST_PRODUCT = 'DECREMENT_GUEST_PRODUCT'
const DELETE_GUEST_PRODUCT = 'DELETE_GUEST_PRODUCT'

//ACTION CREATORs
export const addProduct = product => ({
  type: ADD_GUEST_PRODUCT,
  product
})

export const gotCart = cart => ({
  type: GET_GUEST_CART,
  cart
})

export const increaseQuantity = productId => ({
  type: INCREMENT_GUEST_PRODUCT,
  productId
})

export const decreaseQuantity = productId => ({
  type: DECREMENT_GUEST_PRODUCT,
  productId
})

export const deleteProduct = productId => ({
  type: DELETE_GUEST_PRODUCT,
  productId
})

// const initialState = {
//   products: [],
//   quantities: {}
// }

const initialState = []

//reducer
const localCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_GUEST_PRODUCT:
      action.product.quantity = 1
      return [...state, action.product]
    // console.log(state.quantities)
    // if(!state.quantities[action.product.id]){
    //   state.quantities[action.product.id] = 1
    //   return {...state, products: [...state.products, action.product]}
    // }else{
    //   state.quantities[action.product.id]++
    //   return {...state}
    // }
    case INCREMENT_GUEST_PRODUCT:
      console.log('incrementing prod')
      //look for product in state and increment quantity
      return state.filter(
        product =>
          product.id === action.productId ? product.quantity++ : product
      )
    case DECREMENT_GUEST_PRODUCT:
      return state.filter(
        product =>
          product.id === action.productId && product.quantity > 1
            ? product.quantity--
            : product
      )
    case GET_GUEST_CART:
      return action.cart
    case DELETE_GUEST_PRODUCT:
      console.log('deleting product')
      return state.filter(product => product.id !== action.productId)
    default:
      return state
  }
}

export default localCartReducer
