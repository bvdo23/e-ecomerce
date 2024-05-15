import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider từ react-redux
import LoginPage from './pages/LoginPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import HomePage from './pages/HomePage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import EditProductPage from './pages/EditProductPage.jsx';
import ProductDetail from './pages/ProductDetails.jsx';
import AddProduct from './pages/AddProduct.jsx';
import Dashboard from './pages/Dashboard.jsx';
import CartPage from './pages/CartPage.jsx';
import Payment from './pages/PaymentPage.jsx';
import store, { persistor } from './redux/store.jsx';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/register" element={<RegisterPage />} />
            <Route exact path="/admin" element={<AdminPage />} />
            <Route exact path="/edit-product/:productId" element={<EditProductPage />} />
            <Route exact path="/products/:productId" element={<ProductDetail />} />
            <Route exact path="/add-products" element={<AddProduct />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/cart" element={<CartPage />} />
            <Route exact path="/payment" element={<Payment />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App; 
