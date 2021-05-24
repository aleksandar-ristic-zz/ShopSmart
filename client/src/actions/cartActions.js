import axios from 'axios';

import { 
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SAVE_SHIPPING_INFO
 } from '../constants/cartConstants';

// Add Item To Cart
export const addItemToCart = (id, quantity) => async (dispatch, getState) => {

  const { data: { product: {
    _id,
    name,
    price,
    images,
    stock,
  }} } = await axios.get(`/api/v1/product/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: _id,
      name,
      price,
      image: images[0].url,
      stock,
      quantity
    }
  });

  localStorage.setItem('cartItems', 
  JSON.stringify(getState().cart.cartItems));
}

// Remove Item From Cart
export const removeItemFromCart = (id) => async (dispatch, getState) => {

  dispatch({
    type: REMOVE_FROM_CART,
    payload: id
  });

  localStorage.setItem('cartItems', 
  JSON.stringify(getState().cart.cartItems));
}

// Save Shipping Info
export const saveShippingInfo = (data) => async (dispatch) => {

  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data
  });

  localStorage.setItem('shippingInfo', 
  JSON.stringify(data));
}