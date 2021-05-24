import { useEffect } from 'react'
import { Route } from 'react-router-dom'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

import Home from './components/Home'
import ProductDetails from './components/product/ProductDetails'

import Cart from './components/cart/Cart'
import Shipping from './components/cart/Shipping'
import ConfirmOrder from './components/cart/Shipping'

import Login from './components/user/Login'
import Register from './components/user/Register'
import Profile from './components/user/Profile'
import UpdateProfile from './components/user/UpdateProfile'
import UpdatePassword from './components/user/UpdatePassword'
import ForgotPassword from './components/user/ForgotPassword'
import ResetPassword from './components/user/ResetPassword'

import ProtectedRoute from './components/route/ProtectedRoute'
import { loadUser } from './actions/userActions'
import store from './store'

function App() {

  useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  return (
    <>
      <Header />
      <div className="container container-fluid">
      <Route exact path="/" component={Home} />
      <Route path="/search/:keyword" component={Home} />
      <Route exact path="/product/:id" component={ProductDetails} />

      <Route exact path="/cart" component={Cart} />
      <ProtectedRoute path="/shipping" component={Shipping} />
      <ProtectedRoute path="/order/confirm" component={ConfirmOrder} />

      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route exact path="/password/forgot" component={ForgotPassword} />
       <Route exact path="/password/reset/:token" component={ResetPassword} />

      <ProtectedRoute exact path="/me" component={Profile} />
      <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
      <ProtectedRoute exact path="/password/update" component={UpdatePassword} />
      <Footer />
      </div>
    </>
  );
}

export default App;
