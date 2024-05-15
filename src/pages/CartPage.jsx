// src/components/CartPage.js
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import '../styles/cartpage.css';
import Header from '../components/Header';
import { removeFromCart } from '../redux/cartSlice';

function CartPage() {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(cartItems);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const payment = () => {
        navigate('/payment', { state: { amount: calculateTotal() } });
    }

    return (
        <div>
            <Header />
            <div className="cart-container">
                <h2>Shopping Cart</h2>
                {cartItems.length > 0 ? (
                    <div>
                        {cartItems.map((item, index) => (
                            <div key={index} className="cart-item">
                                <p>{item.name}</p>
                                <p>Price: {item.price}</p>
                                <p>Quantity: {item.quantity}</p>
                                <Button
                                    variant="danger"
                                    className="btn-remove"
                                    onClick={() => handleRemoveFromCart(item.product_id)}
                                >
                                    Xóa sản phẩm
                                </Button>
                            </div>
                        ))}
                        <div className="cart-total">
                            <h3>Total: {calculateTotal()}</h3>
                        </div>
                        <Button variant="primary" className="btn" onClick={payment}>
                            Proceed to Checkout
                        </Button>
                    </div>
                ) : (
                    <p>Your cart is empty</p>
                )}
            </div>
        </div>
    );
}

export default CartPage;
