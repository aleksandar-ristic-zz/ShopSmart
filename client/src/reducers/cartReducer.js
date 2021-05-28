import { 
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SAVE_SHIPPING_INFO
} from '../constants/cartConstants';

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} }, action) => {
    const { type, payload } = action;

    switch(type) {
      case ADD_TO_CART:
        const item = payload;

        const itemExists = state.cartItems.find(i => 
          i.product === item.product)

        if (itemExists) {
          return {
            ...state,
            cartItems: state.cartItems.map(i => 
            i.product === itemExists.product ? item : i)
          }
        } else {
          return {
            ...state,
            cartItems: [...state.cartItems, item]
          }
        }
      case REMOVE_FROM_CART:
        return {
          ...state,
          cartItems: state.cartItems.filter(i => 
            i.product !== payload)
        }
      case SAVE_SHIPPING_INFO:
        return {
          ...state,
          shippingInfo: payload
        }
      default:
        return state
    }
  }