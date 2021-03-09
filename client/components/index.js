/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login} from './auth-form'
export {Signup} from './Signup'
export {default as AllProducts} from './AllProducts'
export {default as AddToCart} from './AddToCart'
export {default as SingleProduct} from './SingleProduct'
export {default as UserList} from './UserList'
export {default as Cart} from './Cart'
export {default as OrderConfirmation} from './OrderConfirmation'
