/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './Views/user-home'
export {Login} from './Forms/auth-form'
export {Signup} from './Forms/Signup'
export {default as AllProducts} from './Views/AllProducts'
export {default as AddToCart} from './Buttons/AddToCart'
export {default as SingleProduct} from './Views/SingleProduct'
export {default as UserList} from './Views/UserList'
export {default as Cart} from './Views/Cart'
export {default as OrderConfirmation} from './Views/OrderConfirmation'
