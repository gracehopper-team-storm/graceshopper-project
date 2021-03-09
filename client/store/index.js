import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import allProductsReducer from './allProducts'
import singleProductReducer from './singleProduct'
import cartReducer from './cart'
import allUsersReducer from './allUsers'
import localCartReducer from './localCart'
import {loadState, saveState} from './localStorage'

const localCart = loadState()
const reducer = combineReducers({
  user,
  allProductsReducer,
  singleProductReducer,
  cartReducer,
  allUsersReducer,
  localCartReducer
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

const store = createStore(reducer, localCart, middleware)
console.log('STORE IN INDEX REDUX', store)

store.subscribe(() => {
  saveState({
    localCartReducer: store.getState().localCartReducer
  })
})

export default store
export * from './user'
