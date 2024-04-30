
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/productdetails.css';
import Header from '../components/Header';
function ProductDetail() {
    const [product, setProduct] = useState(null);
    const { productId } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState('');

    useEffect(() => {
        console.log(productId);
        fetch(`http://localhost:3000/api/products/${productId}`)
            .then(response => response.json())
            .then(data => {
                setProduct(data);
                setSelectedImage(data.image_url[0]);
            })
            .catch(error => console.error('Error fetching product detail:', error));
        console.log(product)
    }, [productId]);

    const handleImageChange = event => {
        setSelectedImage(event.target.value);

    };

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
                    <div>
                        <img className='product-image' src={selectedImage} alt="Product" />
                        <select value={selectedImage} onChange={handleImageChange}>
                            {product.image_url?.map((imageUrl, index) => (
                                <option key={index} value={imageUrl}>
                                    Image {index + 1}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <p>{product.name}</p>
                        <p>{product.description}</p>
                        <p>Price: {product.price}</p>
                        <p>Stock Quantity: {product.stock_quantity}</p>
                    </div>
                    <div>
                        <div>
                            <p>Số lượng</p>
                            <button onClick={decreaseQuantity}>-</button>
                            <span>{quantity}</span>
                            <button onClick={increaseQuantity}>+</button>
                        </div>
                        <div>
                            <p>Tạm tính</p>

                        </div>
                        <button>
                            Mua ngay
                        </button>
                        <button>
                            Thêm vào giỏ hàng
                        </button>
                        <button>
                            Mua trả góp
                        </button>

                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ProductDetail;
