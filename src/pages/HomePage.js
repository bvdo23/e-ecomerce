import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import '../styles/homepage.css';
import ControlledCarousel from '../components/ControlledCarousel';
import { FormCheck } from 'react-bootstrap';
function HomePage() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    console.log(products);

    return (
        <div className='home-page-container'>
            <Header />
            <ControlledCarousel />
            <div className='home-container'>
                <div className="search-filter">
                    <div>
                        <h5>Đánh giá</h5>
                    </div>
                    <div>
                        <h5>Giá tiền</h5>
                    </div>
                    <div>
                        <h5>Thương hiệu</h5>
                        <FormCheck>VIVO</FormCheck>
                        <FormCheck>SamSung</FormCheck>
                        <FormCheck>Apple</FormCheck>
                    </div>
                </div>
                <div className="product-list">
                    {products.map(product => (
                        <div key={product.product_id} className="product">
                            <img src={product.image_url[0]} alt={product.name} className="product-image" />
                            <p>{product.name}</p>
                            <p>Price: {product.price}</p>
                            <p>Brand: {product.brand}</p>
                        </div>
                    ))}
                </div>


            </div>
        </div>
    );
}

export default HomePage;
