// src/components/HomePage.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/homepage.css';
import ControlledCarousel from '../components/ControlledCarousel';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

function HomePage() {
    const cartItems = useSelector(state => state.cart.items);
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const getProducts = async () => {
            const res = await fetch('http://localhost:3000/api/products?_page=1&_limit=87');
            const data = await res.json();
            setProducts(data);
            console.log('Cart Items:', cartItems);
        };
        getProducts();
    }, []);

    const fetchProducts = async (currentPage) => {
        console.log(currentPage);
        const res = await fetch(`http://localhost:3000/api/products?_page=${currentPage}&_limit=84`);
        const data = await res.json();
        return data;
    };

    const handlePageClick = async (data) => {
        console.log(data);
        let currentPage = data.selected + 1;
        const getformserver = await fetchProducts(currentPage);
        setProducts(getformserver);
    };

    const handleAddToCart = (product) => {
        dispatch(addToCart({ product_id: product.product_id, name: product.name, price: product.price, quantity: 1 }));
        console.log('Cart Items:', cartItems);
    };

    return (
        <div className='home-page-container'>
            <Header />
            <ControlledCarousel />
            <div className='home-container'>
                <div className="product-list">
                    {products.map(product => (
                        <div className="product" key={product.product_id}>
                            <Link to={`/products/${product.product_id}`}>
                                <div>
                                    <img src={product.image_url[0]} alt={product.name} className="product-image-home" />
                                </div>
                            </Link>
                            <p>{product.name}</p>
                            <p>{product.price}</p>
                            <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                                Thêm vào giỏ
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                pageCount={25}
                marginPagesDisplayed={3}
                pageRangeDisplayed={6}
                onPageChange={handlePageClick}
                containerClassName={'pagination justify-content-center'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                activeClassName={'active'}
            />
        </div>
    );
}

export default HomePage;
