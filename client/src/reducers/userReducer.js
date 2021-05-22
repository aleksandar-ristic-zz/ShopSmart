import { 
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_ERRORS
} from '../constants/userConstants'

export const authReducer = (state = { user: {} }, action) => {
  const { type, payload } = action;

  switch(type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
      return {
        loading: true,
        isAuth: false
      }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuth: true,
        user: payload
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
