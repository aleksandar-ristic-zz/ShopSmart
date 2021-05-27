import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { getOrderDetails, clearErrors } from '../../actions/orderActions'

const OrderDetails = ({ match }) => {

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, order= {} } = useSelector(state => state.orderDetails);

  const {
     _id,
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalPrice,
    orderStatus
  } = order

  useEffect(() => {
    dispatch(getOrderDetails(match.params.id));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, match.params.id]);

  const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`

  const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ?
  true : false;

  return (
    <>
      <MetaData title={'Order Details'} />

      {loading ? <Loader /> : (
        <>
          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 order-details">

              <h1 className="my-5 p-3 blue">Order # {_id}</h1>

              <h4 className="mb-4">Shipping Info</h4>
              <p><b>Name:</b> {user && user.name}</p>
              <p><b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}</p>
              <p className="mb-4"><b>Address:</b>{shippingDetails}</p>
              <p className="lead"><b>Amount:</b> ${totalPrice}</p>

              <hr/>

              <h4 className="my-4">Payment</h4>
              <p className={isPaid ? 'greenColor' : 'redColor'} ><b>{isPaid ? 'PAID' : 'NOT PAID'}</b></p>


              <h4 className="my-4">Order Status:</h4>
              <p className={orderStatus && String(orderStatus)
        .includes('Delivered') ? "greenColor" : "redColor"}><b> {orderStatus}</b></p>


              <h4 className="my-4">Order Items:</h4>

              <hr/>
                      
              <div className="cart-item my-1">
                {orderItems && orderItems.map(item => (
                  <div className="row my-5 d-flex align-items-center" key={item.product}>
                    <div className="col-4 col-lg-2 p-3 center">
                    
                      <img src={item.image} alt={item.name} height="45" width="65" />
                    </div>

                    <div className="col-5 col-lg-5 center p-3">
                      <Link to={`/products/${item.product}`}>
                      {item.name}</Link>
                    </div>

                    <div className="col-4 col-lg-2 mt-4 mt-lg-0 p-3 center">
                      <span className="lead">{item.price}</span>
                    </div>

                    <div className="col-4 col-lg-3 mt-4 mt-lg-0 py-3 blue center">
                      <span className="inherit">{item.quantity > 1 ? `${item.quantity} Pieces` : '1 Piece'}</span>
                    </div>
                  </div>
                ))}
              </div>
            
              <hr/>

            </div>
          </div>
        </>
      )}
    </>
  )
}

export default OrderDetails
