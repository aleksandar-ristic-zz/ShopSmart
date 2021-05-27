import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layout/MetaData'

import { useDispatch, useSelector } from 'react-redux'
import { 
  removeItemFromCart 
} from '../../actions/cartActions'

const OrderSuccess = () => {

  const dispatch = useDispatch();

  const { cartItems } = useSelector(state=> state.cart);

  useEffect(() => {

    cartItems.forEach(item => {
      dispatch(removeItemFromCart(item.product));
    });

  }, [dispatch,cartItems])

  return (
    <>
      <MetaData title={'Order Success'} />

      <div className="row justify-content-center">
        <div className="col-6 mt-5 text-center">

          <img className="my-5 img-fluid d-block mx-auto" src={'/images/order_success.png'} alt="Order Success" width="200" height="200" />

          <h2>Your Order has been placed successfully.</h2>

          <Link to="/orders/me">Go to Orders</Link>

        </div>
      </div>
    </>
  )
}

export default OrderSuccess
