import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Header from '../components/Header';
// import '../styles/addProduct.css';

function AddProduct() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock_quantity: '',
        imageFiles: [],
        imageUrlPreviews: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        const imageUrlPreviews = files.map(file => URL.createObjectURL(file));
        setFormData(prevState => ({
            ...prevState,
            imageFiles: files,
            imageUrlPreviews: imageUrlPreviews
        }));

        const formDataImage = new FormData();
        files.forEach(file => {
            formDataImage.append('image', file);
        });

        try {
            const response = await fetch('http://localhost:3000/api/upload', {
                method: 'POST',
                body: formDataImage
            });

            if (!response.ok) {
                throw new Error('Failed to upload image');
            }

            const data = await response.json();
            const imageUrls = data.urls;

            setFormData(prevState => ({
                ...prevState,
                imageUrls: imageUrls
            }));
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Construct form data with other fields and image URLs
        // Send POST request to API endpoint for creating product
    };

    return (
        <div>
            <Header />
            <div className="add-product-container">
                <h2>Add Product</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" name="description" value={formData.description} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" name="price" value={formData.price} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="stock_quantity">
                        <Form.Label>Stock Quantity</Form.Label>
                        <Form.Control type="text" name="stock_quantity" value={formData.stock_quantity} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="images">
                        <Form.Label>Images</Form.Label>
                        <Form.Control type="file" name="images" accept="image/*" multiple onChange={handleImageUpload} />
                        <div className="image-preview-container">
                            {formData.imageUrlPreviews.map((imageUrl, index) => (
                                <img key={index} src={imageUrl} alt={`Preview ${index}`} className="image-preview" />
                            ))}
                        </div>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add Product
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default AddProduct;
