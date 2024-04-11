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
            <div className='product-container' style={{
                height: "1000px",
                marginLeft: "3%",
                marginTop: "10px",
                width: "94%",
                backgroundColor: "#FFFFE0",
                borderRadius: "3%",
                display: "-webkit-flex",
                flexWrap: "wrap"

            }}>
                <h2 style={{
                    marginLeft: "45%"

                }}>Products</h2>
                <ul>
                    {products.map(product => (
                        <li key={product.product_id}>
                            <Card style={{
                                width: "200px",
                                height: "300px",
                            }}>
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <Card.Body>
                                    <Card.Title>Card Title</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the
                                        bulk of the card's content.
                                    </Card.Text>
                                    <Button variant="primary">Go somewhere</Button>
                                </Card.Body>
                            </Card>
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>Price: ${product.price}</p>
                            <p>Stock Quantity: {product.stock_quantity}</p>
                            <p>Brand: {product.brand}</p>
                            {product.image_url.length > 0 && (
                                <div>
                                    <p>Images:</p>
                                    <ul>
                                        {product.image_url.map((imageUrl, index) => (
                                            <li key={index}>
                                                <img src={imageUrl} alt={`Image ${index + 1}`} />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>



            </div>
        </div>
        // <div className='product-container' style={{
        //     // height: "1000px",
        //     marginLeft: "3%",
        //     marginTop: "10px",
        //     width: "94%",
        //     backgroundColor: "#FFFFE0",
        //     borderRadius: "3%",
        //     display: "flex",
        //     flexWrap: "wrap",
        //     justifyContent: "space-between"
        // }}>
        //     <h2 style={{ marginLeft: "45%" }}>Products</h2>
        //     {products.map(product => (
        //         <div key={product.product_id}
        //             style={{
        //                 flexBasis: "calc(20% - 20px)",
        //                 paddingTop: "50px",
        //                 paddingLeft: "5%",
        //                 paddingRight: "5%",
        //                 marginBottom: "10%"
        //             }}>
        //             <Card
        //                 style={{ width: "200px", height: "300px" }}
        //             >
        //                 <h3>{product.name}</h3>
        //                 <p>{product.description}</p>
        //                 <p>Price: ${product.price}</p>
        //                 <p>Stock Quantity: {product.stock_quantity}</p>
        //                 <p>Brand: {product.brand}</p>
        //             </Card>

        //         </div>
        //     ))}
        // </div>
    );
}
// const styles = {

// }
export default HomePage;
