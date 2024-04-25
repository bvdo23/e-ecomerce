import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

function EditProduct() {
    const { productId } = useParams();
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: 0,
        stock_quantity: 0
    });

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/products/${productId}`);
            const data = await response.json();
            setProduct(data);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/api/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });
            if (response.ok) {
                alert('Product updated successfully');
            } else {
                alert('Failed to update product');
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div>
            <h1>Edit Product</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" value={product.name} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" name="description" value={product.description} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group controlId="formPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" name="price" value={product.price} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group controlId="formStockQuantity">
                    <Form.Label>Stock Quantity</Form.Label>
                    <Form.Control type="number" name="stock_quantity" value={product.stock_quantity} onChange={handleInputChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Update Product
                </Button>
            </Form>
        </div>
    );
}

export default EditProduct;
