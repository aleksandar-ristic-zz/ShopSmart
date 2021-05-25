import axios from 'axios'
import e from 'express'

import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  CLEAR_ERRORS
} from '../constants/orderConstants'


// Create Order
export const createOrder = (order) => async (dispatch, getState) => {
  try {

    dispatch({ type: CREATE_ORDER_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const { data } = await axios.post('/api/v1/order/new', order, config);

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data
    })

  } catch (err) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: err.response.data.errorMessage
    })
  }
}

// Currently logged in users orders
export const myOrders = () => async (dispatch, getState) => {
  try {
    
    dispatch({ type: MY_ORDERS_REQUEST });

    const { data } = await axios.get('/api/v1/orders/me');

    dispatch({
      type: MY_ORDERS_SUCCESS,
      payload: data.orders
    })

  } catch(err) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: err.response.data.errorMessage
    })
  }
}

// Clear Errors
export const clearErrors = () => async dispatch => {
  dispatch({
    type: CLEAR_ERRORS
  });
}