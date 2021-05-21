import { 
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERRORS
} from '../constants/productConstants'


export const productsReducer = (
  state = { products: []}, action) => {
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

export const productDetailsReducer = (
  state = {product: {} }, action) => {
    const { type, payload } = action;

    switch(type) {
      case PRODUCT_DETAILS_REQUEST:
        return {
          ...state,
          loading: true
        }
      case PRODUCT_DETAILS_SUCCESS:
       return {
         ...state,
         loading: false,
         product: payload
       }
      case PRODUCT_DETAILS_FAIL:
         return {
           ...state,
           loading: false,
           error: null
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