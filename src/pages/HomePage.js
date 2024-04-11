import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import ControlledCarousel from '../components/ControlledCarousel';
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

        </div>
    );
}
// const styles = {

// }
export default HomePage;
