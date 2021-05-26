import { 
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  ADMIN_PRODUCTS_REQUEST,
  ADMIN_PRODUCTS_SUCCESS,
  ADMIN_PRODUCTS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_RESET,
  NEW_REVIEW_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_RESET,
  NEW_PRODUCT_FAIL,
  CLEAR_ERRORS
} from '../constants/productConstants'


export const productsReducer = (
  state = { products: []}, action) => {
const { type, payload } = action;

  switch(type) {
    case ALL_PRODUCTS_REQUEST:
    case ADMIN_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: []
      }
    case ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: payload.products,
        productsCount: payload.productsCount,
        resPerPage: payload.resPerPage,
        filteredProductsCount: payload.filteredProductsCount
      }
    case ADMIN_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: payload
      }
    case ALL_PRODUCTS_FAIL:
    case ADMIN_PRODUCTS_FAIL:
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

export const newReviewReducer = (
  state = {}, action) => {
    const { type, payload } = action;

    switch(type) {
      case NEW_REVIEW_REQUEST:
        return {
          ...state,
          loading: true
        }
      case NEW_REVIEW_SUCCESS:
       return {
         loading: false,
         success: payload
       }
      case NEW_REVIEW_FAIL:
         return {
           ...state,
           loading: false,
           error: payload
         }
      case NEW_REVIEW_RESET:
        return {
          ...state,
          success: false
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

export const newProductReducer = (
  state = {product: {} }, action) => {
    const { type, payload } = action;

    switch(type) {
      case NEW_PRODUCT_REQUEST:
        return {
          ...state,
          loading: true
        }
      case NEW_PRODUCT_SUCCESS:
       return {
         loading: false,
         success: payload.success
       }
      case NEW_PRODUCT_FAIL:
         return {
           ...state,
           loading: false,
           error: payload
         }
      case NEW_PRODUCT_RESET:
        return {
          ...state,
          success: false
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
