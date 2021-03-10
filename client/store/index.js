import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './redux/user'
import allProductsReducer from './redux/allProducts'
import singleProductReducer from './redux/singleProduct'
import cartReducer from './redux/cart'
import allUsersReducer from './redux/allUsers'
import localCartReducer from './redux/localCart'
import {loadState, saveState} from './redux/localStorage'

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
export * from './redux/user'
