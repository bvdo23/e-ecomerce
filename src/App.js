import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage.js';
import NotFoundPage from './pages/NotFoundPage.js';
import HomePage from './pages/HomePage.js';
import RegisterPage from './pages/RegisterPage.js';
import Cart from './pages/Cart.js';
import AdminPage from './pages/AdminPage.js';
import EditProductPage from './pages/EditProductPage.js';
import ProductDetail from './pages/ProductDetails.js';
import AddProduct from './pages/AddProduct.js';
import Dashboard from './pages/Dashboard.js';



function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/admin" element={<AdminPage />} />
        <Route exact path="/edit-product/:productId" element={<EditProductPage />} />
        <Route exact path="/products/:productId" element={<ProductDetail />} />
        <Route exact path="/add-products" element={<AddProduct />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;