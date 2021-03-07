import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import allProductsReducer from './allProducts'
import singleProductReducer from './singleProduct'
import cartReducer from './cart'
import allUsersReducer from './allUsers'

const reducer = combineReducers({
  user,
  allProductsReducer,
  singleProductReducer,
  cartReducer,
  allUsersReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
