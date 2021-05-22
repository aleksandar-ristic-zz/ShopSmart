import axios from 'axios';

import { 
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  CLEAR_ERRORS
} from '../constants/userConstants'

// Login
export const loginUser = (email, password) => async dispatch => {
  try {
   
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const { data } = await axios.post(
      '/api/v1/login', {email, password}, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user
    })

  } catch(err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data.errorMessage
    });
  }
}

export const registerUser = (user) => async dispatch => {
  try {
   
    dispatch({ type: REGISTER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

    const { data } = await axios.post(
      '/api/v1/register', user, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data.user
    })

  } catch(err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data.errorMessage
    });
  }
}

export const loadUser = () => async dispatch => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.post('/api/v1/me');

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user
    });

  } catch(err) {
    dispatch({
      type: LOAD_USER_FAIL,
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