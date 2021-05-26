import { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

import Home from './components/Home'
import ProductDetails from './components/product/ProductDetails'

// Cart Imports
import Cart from './components/cart/Cart'
import Shipping from './components/cart/Shipping'
import ConfirmOrder from './components/cart/ConfirmOrder'
import Payment from './components/cart/Payment'
import OrderSuccess from './components/cart/OrderSuccess'

// Order Imports
import ListOrders from './components/order/ListOrders'
import OrderDetails from './components/order/OrderDetails'

// Auth or User imports
import Login from './components/user/Login'
import Register from './components/user/Register'
import Profile from './components/user/Profile'
import UpdateProfile from './components/user/UpdateProfile'
import UpdatePassword from './components/user/UpdatePassword'
import ForgotPassword from './components/user/ForgotPassword'
import ResetPassword from './components/user/ResetPassword'

// Admin imports
import Dashboard from './components/admin/Dashboard'
import ProductsList from './components/admin/ProductsList'

import ProtectedRoute from './components/route/ProtectedRoute'
import { loadUser } from './actions/userActions'
import store from './store'
import axios from 'axios'

// Payment
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

function App() {

  const [stripeApiKey, setStripeApiKey] = useState('');

  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripeApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi');
      
      setStripeApiKey(data.stripeApiKey);
    }
   getStripeApiKey();

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
      <ProtectedRoute path="/order/confirm" stripe={stripeApiKey} component={ConfirmOrder} />
      <ProtectedRoute path="/success" component={OrderSuccess} />
      {stripeApiKey && 
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute path="/payment" component={Payment} />
        </Elements>
      }

      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route exact path="/password/forgot" component={ForgotPassword} />
       <Route exact path="/password/reset/:token" component={ResetPassword} />

      <ProtectedRoute exact path="/me" component={Profile} />
      <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
      <ProtectedRoute exact path="/password/update" component={UpdatePassword} />

      <ProtectedRoute exact path="/orders/me" component={ListOrders} />
      <ProtectedRoute exact path="/order/:id" component={OrderDetails} />

      </div>
       <ProtectedRoute exact path="/dashboard" isAdmin={true} component={Dashboard} />
        <ProtectedRoute exact path="/admin/products" isAdmin={true} component={ProductsList} />
       <Footer />
    </>
  );
}

export default App;
