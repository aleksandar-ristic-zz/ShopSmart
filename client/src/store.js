import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { productsReducer, productDetailsReducer, newProductReducer, productReducer, newReviewReducer, productReviewsReducer, reviewReducer }  from './reducers/productReducer'

import { allUsersReducer, authReducer, forgotPasswordReducer, userDetailsReducer, userReducer} from './reducers/userReducer'

import { cartReducer } from './reducers/cartReducer'

import { newOrderReducer, myOrdersReducer, orderDetailsReducer, allOrdersReducer, orderReducer  } from './reducers/orderReducer'

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  newProduct: newProductReducer,
  product: productReducer,
  productReviews: productReviewsReducer,
  newReview: newReviewReducer,
  review: reviewReducer,
  auth: authReducer,
  user: userReducer,
  userDetails: userDetailsReducer,
  allUsers: allUsersReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  orderDetails: orderDetailsReducer
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems')) : [],
    shippingInfo: localStorage.getItem('shippingInfo')
    ? JSON.parse(localStorage.getItem('shippingInfo')) : []
  }
}

const middleware = [thunk];
const store = createStore(
  reducer, 
  initialState, 
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store