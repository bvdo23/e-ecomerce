import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Carousel } from 'react-bootstrap';
import '../styles/productdetails.css';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

function ProductDetail() {
    const [product, setProduct] = useState(null);
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const { productId } = useParams();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    useEffect(() => {
        fetch(`http://localhost:3000/api/products/${productId}`)
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => console.error('Error fetching product detail:', error));

        fetchRecommendedProducts();
    }, [productId]);

    const fetchRecommendedProducts = () => {
        fetch(`http://localhost:3000/api/recommended-products/${productId}`)
            .then(response => response.json())
            .then(data => setRecommendedProducts(data))
            .catch(error => console.error('Error fetching recommended products:', error));
    };

    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const handleAddToCart = () => {
        if (product) {
            dispatch(addToCart({ product_id: product.product_id, name: product.name, price: product.price, quantity }));
            console.log('Cart Items:', cartItems);
        }
    };
    const payment = () => {
        navigate('/payment', { state: { amount: quantity * product.price, price: product.price, quantity } });
    }

    return (
        <div>
            <Header />
            <div>
                {product ? (
                    <div className='product-container'>
                        <div className='product-image'>
                            <Carousel className='product-image'>
                                {product.image_url.map((imageUrl, index) => (
                                    <Carousel.Item key={index}>
                                        <img
                                            className='product-image'
                                            src={imageUrl}
                                            alt={`Image ${index + 1}`}
                                        />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>
                        <div className='product-information'>
                            <p>{product.name}</p>
                            <p>{product.description}</p>
                            <p>Price: {product.price}</p>
                            <p>Stock Quantity: {product.stock_quantity}</p>
                        </div>
                        <div className='product-menu'>
                            <div>
                                <p>Số lượng</p>
                                <button onClick={decreaseQuantity}>-</button>
                                <span>{quantity}</span>
                                <button onClick={increaseQuantity}>+</button>
                            </div>
                            <div>
                                <p>Tạm tính</p>
                            </div>
                            <Button variant="danger" className='btn_dt' onClick={payment}>
                                Mua ngay
                            </Button>
                            <br />
                            <Button variant="secondary" className='btn_dt' onClick={handleAddToCart}>
                                Thêm vào giỏ hàng
                            </Button>
                            <br />
                            <Button variant="secondary" className='btn_dt'>
                                Mua trả góp
                            </Button>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            {/* <div className='recommend-product'>
                <h2>Recommended Products</h2>
                <div className='recommended-products-container'>
                    {recommendedProducts.map((recommendedProduct, index) => (
                        <div key={index} className='recommended-product'>
                            <img src={recommendedProduct.image_url} alt={`Recommended Product ${index + 1}`} />
                            <p>{recommendedProduct.name}</p>
                            <p>Price: {recommendedProduct.price}</p>
                        </div>
                    ))}
                </div>
            </div> */}
        </div>
    );
}

export default ProductDetail;
