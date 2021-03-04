import axios from 'axios'

// action type
const SET_PRODUCTS = 'SET_PRODUCTS'

// action creator
const setProducts = products => ({
  type: SET_PRODUCTS,
  products
})

//thunk

//NOTE: PLEASE check if the route path is correct
export const getProducts = () => async dispatch => {
  try {
    const products = await axios.get('/api/allproducts')
    dispatch(setProducts(products.data))
  } catch (error) {
    console.error(error)
  }
}

//reducer
//NOTE: PLEASE check if the initial state would be [] or {}
const initialState = []

const allProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return [...action.products]
    default:
      return state
  }
}

export default allProductsReducer
