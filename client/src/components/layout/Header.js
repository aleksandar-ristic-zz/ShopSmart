import React from 'react'
import { Route, Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'

import { FaCartArrowDown, FaUserEdit } from 'react-icons/fa'
import { AiOutlineDashboard, AiOutlineGift } from 'react-icons/ai'
import { BiExit } from 'react-icons/bi'

import { logoutUser } from '../../actions/userActions'
import Search from './Search'

const Header = () => {

  const alert = useAlert();
  const dispatch = useDispatch();

  const { user, loading } = useSelector(state => state.auth);
  const { cartItems } = useSelector(state => state.cart)

  const logoutHandler = () => {
    dispatch(logoutUser());
    alert.success('Logged out succesfully.')
  }

  return (
    <>
       <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to='/'>
            <img src="/images/logo.png" alt="logo" />
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Route render={({ history }) => 
        <Search history={history} />} />
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">

        {user ? (

          <div className="ml-4 dropdown d-inline">
            <Link to="#!" className="btn dropdown-toggle text-white mr-4"
            type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

            <figure className="avatar avatar-nav">
              <img 
              src={user.avatar && user.avatar.url} 
              alt={user && user.name} 
              className="rounded-circle"
              />
            </figure>
              <span>{user && user.name}</span>
            </Link>

            <div
            className="dropdown-menu" aria-labelledby="dropDownMenuButton"
            >

              {user && user.role === 'admin' && (
                 <Link to="/dashboard" className="dropdown-item d-flex align-items-center">
                 <AiOutlineDashboard className="mr-1" /> Dashboard
                </Link>
              )}

                 <Link to="/orders/me" className="dropdown-item d-flex align-items-center">
                 <AiOutlineGift className="mr-1" /> Orders
                </Link>

                <Link to="/me" className="dropdown-item d-flex align-items-center">
                <FaUserEdit className="mr-1" /> Profile
                </Link>

              <Link 
                to="/" 
                className="dropdown-item text-danger d-flex align-items-center"
                onClick={logoutHandler}>
                <BiExit className="mr-1" /> Logout
                </Link>

            </div>

          </div>

        ) : !loading &&  <Link to="/login" className="btn ml-4" id="login_btn">Login</Link> }

        <Link to="/cart" style={{ textDecoration: 'none' }}>
          <span id="cart" className="ml-3"><FaCartArrowDown /></span>
          <span className="ml-1" id="cart_count">
            {cartItems.length}
          </span>
        </Link>

      </div>
    </nav>
    </>
  )
}

export default Header
