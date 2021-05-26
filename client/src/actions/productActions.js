import axios from 'axios';

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
  NEW_REVIEW_FAIL,
  CLEAR_ERRORS
} from '../constants/productConstants'


// Get All Products
export const getProducts = (
  keyword= '',
  currentPage= 1, 
  price,
  category,
  rating= 0
) => async dispatch => {

  try {
   
    dispatch({ type: ALL_PRODUCTS_REQUEST});
    
    let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`

    if (category) {
      link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`
    }

    const { data } = await axios.get(link);

    dispatch({
      type: ALL_PRODUCTS_SUCCESS,
      payload: data
    });

  } catch(err) {
    dispatch({
      type: ALL_PRODUCTS_FAIL,
      payload: err.response.data.errorMessage
    });
  }
}

// Get Product Details
export const getProductDetails = (id) => async dispatch => {

  try {
   
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product
    });

  } catch(err) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: err.response.data.errorMessage
    });
  }
}

// New review
export const newReview = (reviewData) => async dispatch => {

  try {
   
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const { data } = await axios.put(`/api/v1/review`, reviewData, config);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success
    });

  } catch(err) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: err.response.data.errorMessage
    });
  }
}

//* Admin routes

// Get Product Details
export const getAdminProducts = () => async dispatch => {

  try {
   
    dispatch({ type: ADMIN_PRODUCTS_REQUEST });

    const { data } = await axios.get('/api/v1/admin/products');

    dispatch({
      type: ADMIN_PRODUCTS_SUCCESS,
      payload: data.products
    });

  } catch(err) {
    dispatch({
      type: ADMIN_PRODUCTS_FAIL,
      payload: err.response.data.errorMessage
    });
  }
}

// Clear Errors
export const clearErrors = () => async dispatch => {
  dispatch({
    type: CLEAR_ERRORS
  });
}

