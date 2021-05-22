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

export const authReducer = (state = { user: {} }, action) => {
  const { type, payload } = action;

  switch(type) {
    case LOAD_USER_REQUEST:
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
      return {
        loading: true,
        isAuth: false
      }
    case LOAD_USER_SUCCESS:
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuth: true,
        user: payload
      }
    case LOAD_USER_FAIL:
      return {
        loading: false,
        isAuth: false,
        user: null,
        error: payload
      }
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isAuth: false,
        user: null,
        error: payload
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    default:
      return state;
  }
}
