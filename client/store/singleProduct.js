import axios from 'axios'

//action types
const SET_PRODUCT = 'SET_PRODUCT'

//action creators
const setProduct = product => ({
  type: SET_PRODUCT,
  product
})

//thunk
export const fetchProduct = productId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/allproducts/${productId}`)
      dispatch(setProduct(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//reducer

const initialState = {}

const singleProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT:
      return action.product

    default:
      return state
  }
}

export default singleProductReducer
