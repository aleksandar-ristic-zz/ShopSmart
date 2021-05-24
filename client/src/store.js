import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { productsReducer, productDetailsReducer }  from './reducers/productReducer'

import { authReducer, forgotPasswordReducer, userReducer } from './reducers/userReducer'

import { cartReducer } from './reducers/cartReducer'

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems')) 
    : []
  }
}

const middleware = [thunk];
const store = createStore(
  reducer, 
  initialState, 
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store