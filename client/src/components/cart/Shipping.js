import React, { useState } from 'react'

import MetaData from '../layout/MetaData'

import { useDispatch, useSelector } from 'react-redux'

import { saveShippingInfo } from '../../actions/cartActions'

const Shipping = ({ history }) => {

  const { shippingInfo } = useSelector(state => state.cart);

  const [address, setAddress] = useState(shippingInfo.adress);
  const [city, setCity] = useState(shippingInfo.city);
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [country, setCountry] = useState(shippingInfo.country);
  
  const dispatch = useDispatch();

  const submitHandler= (e) => {
    e.preventDefault()

    dispatch(saveShippingInfo({ 
      address, 
      city, 
      phoneNo, 
      postalCode, 
      country 
    }));

    history.push('/confirm');
  }

  return (
    <>
    <MetaData title={'Shipping Info'} />

     <div className="row wrapper">
      <div className="col-10 col-lg-5">

        <form className="shadow-lg">
          <h1 className="mb-4">Shipping Info</h1>

          <div className="form-group">
            <label hmtlFor="address_field">Address</label>
            <input
              type="text"
              id="address_field"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label hmtlFor="city_field">City</label>
            <input
              type="text"
              id="city_field"
              className="form-control"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone_field">Phone No</label>
            <input
              type="phone"
              id="phone_field"
              className="form-control"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label hmtlFor="postal_code_field">Postal Code</label>
            <input
              type="number"
              id="postal_code_field"
              className="form-control"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label hmtlFor="country_field">Country</label>
            <select
              id="country_field"
              className="form-control"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            >
              <option>
                USA
              </option>

            </select>
          </div>

          <button
            id="shipping_btn"
            type="submit"
            className="btn btn-block py-3"
          >
            CONTINUE
          </button>
        </form>

      </div>
     </div>
    </>
  )
}

export default Shipping
