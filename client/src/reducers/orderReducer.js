import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  CLEAR_ERRORS
} from '../constants/orderConstants'

export const newOrderReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch(type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        order: payload
      }
    case CREATE_ORDER_FAIL:
      return {
        loading: false,
        error: payload
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }

    default:
      return state
  }
}

export const myOrdersReducer = (state = {orders: []}, action) => {
  const {type, payload} = action;

  switch(type) {

    case MY_ORDERS_REQUEST:
      return {
        loading: true
      }
    case MY_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: payload
      }
    case MY_ORDERS_FAIL:
      return {
        loading: false,
        error: payload
      }
     case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    default:
      return state
  }
}

export const orderDetailsReducer = (state = {order: {}}, action) => {
  const {type, payload} = action;

  switch(type) {

    case ORDER_DETAILS_REQUEST:
      return {
        loading: true
      }
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        orders: payload
      }
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: payload
      }
     case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    default:
      return state
  }
}