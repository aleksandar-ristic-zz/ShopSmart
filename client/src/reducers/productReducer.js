import { 
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  CLEAR_ERRORS
} from '../constants/productConstants'
export default function productsReducer (
  state = { products: []}, action) {
const { type, payload } = action;

  switch(type) {
    case ALL_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: []
      }
    case ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: payload.products,
        productsCount: payload.productsCount
      }
    case ALL_PRODUCTS_FAIL:
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
};
