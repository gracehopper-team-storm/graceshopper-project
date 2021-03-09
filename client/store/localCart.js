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

//THUNKS OF SORT... GET/set DATA FROM LOCAL STORAGE

//load state from local storage
export const loadState = () => {
  return async dispatch => {
    try {
      const serializedState = localStorage.getItem('state')
      if (serializedState === null) {
        return undefined
      }
      console.log(serializedState)
      //NEEDS TO CREATE ACTION CREATOR AND DISPATCH IT
      dispatch(gotCart(JSON.parse(serializedState)))
    } catch (err) {
      return undefined
    }
  }
}

//puts state in local storage
export const saveState = state => {
  return async dispatch => {
    try {
      const serializedState = JSON.stringify(state)
      localStorage.setItem('state', serializedState)
      //NEEDS TO CREATE ACTION CREATOR AND DISPATCH IT
    } catch {
      // ignore write errors
    }
  }
}

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

saveState(localCartReducer)

export default localCartReducer
