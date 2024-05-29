import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Navigate, Route, useLocation, RouteProps, NavigateProps } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import Checkout from '@/components/Checkout';
import ProtectedRoute from '@/components/Protectedroute';




const Prapp = () => {
    return (
      <Router>
        <ProtectedRoute path="/checkout" component={Checkout} />
        {/* <Route path="/cart" component={ShoppingCart} /> */}
      </Router>
    );
  };
  
  export default Prapp;