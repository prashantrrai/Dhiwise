// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpPage from './Pages/SignUpPage/SignUpPage';
import UsersPage from './Pages/UsersPage/UserPage';
import './App.css';
import Product from './Pages/Product/Product';
import Home from './Pages/HomePage/Home';
import Login from './Pages/Authentication/Login';
import NavBar from './Components/Navbar/NavBar';
import CartPage from './Pages/CartPage/CartPage';
import Checkout from './Components/Payment Checkout/Checkout';
import PaymentSuccess from './Components/Payment Checkout/PaymentSuccess';
import PaymentFailure from './Components/Payment Checkout/PaymentFailure';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/product" element={<Product />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment/checkout" element={<Checkout />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/failure" element={<PaymentFailure />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
