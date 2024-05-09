import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Carousel } from 'react-bootstrap';
import '../styles/productdetails.css';
import Header from '../components/Header';

function ProductDetail() {
    const [product, setProduct] = useState(null);
    const { productId } = useParams();
    const [quantity, setQuantity] = useState(1);


    useEffect(() => {
        fetch(`http://localhost:3000/api/products/${productId}`)
            .then(response => response.json())
            .then(data => {
                setProduct(data);

            })
            .catch(error => console.error('Error fetching product detail:', error));
    }, [productId]);



    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    return (
        <div>
            <Header />
            {product ? (
                <div className='product-container'>
                    <div className='product-image'>
                        <Carousel className='product-image' >
                            {product.image_url.map((imageUrl, index) => (
                                <Carousel.Item key={index}>
                                    <img
                                        className='product-image'
                                        // className='d-block w-100'
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
                            {/* Thêm code tính tạm tính ở đây */}
                        </div>
                        <Button variant="danger" className='btn'>
                            Mua ngay
                        </Button>
                        <br></br>
                        <Button variant="secondary" className='btn'>
                            Thêm vào giỏ hàng
                        </Button>
                        <br></br>
                        <Button variant="secondary" className='btn'>
                            Mua trả góp
                        </Button>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ProductDetail;
