import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'

import { useSelector } from 'react-redux'

const ConfirmOrder = ({ history }) => {

  const { cartItems, shippingInfo: {
    phoneNo,
    address,
    city,
    postalCode,
    country
  } } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.auth);

  // Calculate order prices
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const shippingPrice = itemsPrice > 200 ? 0 : 25;

  const taxPrice = Number((.05 * itemsPrice).toFixed(2));

  const totalPrice = (itemsPrice + shippingPrice + taxPrice)
  .toFixed(2);

  const proceedToPayment = () => {
    const data = {
      itemsPrice: itemsPrice.toFixed(2),
      shippingPrice,
      taxPrice,
      totalPrice
    }
    sessionStorage.setItem('orderInfo', JSON.stringify(data))
    history.push('/payment');
  }

  return (
    <>
      
      <MetaData title={'Confirm Order'} />

      <CheckoutSteps shipping confirmOrder />

        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8 mt-5 order-confirm">

            <h4 className="mb-3">Shipping Info</h4>
            <p><b>Name:</b> {user && user.name}</p>
            <p><b>Phone:</b> {phoneNo}</p>
            <p className="mb-4"><b>Address:</b>{`${address}, ${city}
            ${postalCode}, ${country}`}</p>
                
            <hr/>

            <h4 className="mt-4">My Cart Items:</h4>

            {cartItems.map(item => (
              <Fragment key={item.product}>
                <hr/>

                <div className="cart-item my-1" >
                  <div className="row">
                    <div className="col-4 col-lg-2">
                      <img src={item.image} alt={item.name} height="45" width="65" />
                    </div>

                    <div className="col-5 col-lg-6">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>

                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                      <p>{item.quantity} x {item.price} = <b>{item.quantity * item.price} $</b></p>
                    </div>

                  </div>
                </div>
            
                <hr/>

              </Fragment>
            ))}

            
          </div>
			
			    <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
              <h4>Order Summary</h4>

              <hr/>

              <p>Subtotal:  <span className="order-summary-values">${itemsPrice}</span></p>
              <p>Shipping: <span className="order-summary-values">${shippingPrice}</span></p>
              <p>Tax:  <span className="order-summary-values">${taxPrice}</span></p>

              <hr/>

              <p>Total: <span className="order-summary-values">${totalPrice}</span></p>

              <hr/>

              <button id="checkout_btn" className="btn btn-primary btn-block" onClick={proceedToPayment}
                >Proceed to Payment</button>
            </div>

          </div>
        </div>
    </>
  )
}

export default ConfirmOrder
