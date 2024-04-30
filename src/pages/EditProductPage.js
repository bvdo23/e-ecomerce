import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/editproductpage.css';
import Dropzone from 'react-dropzone';
import axios from 'axios'; // Import Axios for making HTTP requests

function EditProduct() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState('');
    const [newImageUrl, setNewImageUrl] = useState('');

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/products/${productId}`);
            const data = await response.json();
            setProduct(data);
            setSelectedImage(data?.image_url[0]);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    const handleImageChange = event => {
        setSelectedImage(event.target.value);
    };

    const handleDrop = async (acceptedFiles) => {
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:3000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response);
            const imageUrl = response.data; // URL mới từ phản hồi
            setNewImageUrl(imageUrl); // Cập nhật URL mới của hình ảnh
            setSelectedImage(imageUrl);
            console.log(product)
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/api/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...product, image_url: [newImageUrl] }) // Update image_url with new image URL
            });
            if (response.ok) {
                alert('Product updated successfully');
                setSelectedImage(newImageUrl); // Cập nhật selectedImage với URL mới
            } else {
                alert('Failed to update product');
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div>
            <Header />
            {product ? (
                <div className='product-container'>
                    <div>
                        <img className='product-image-edit' src={selectedImage} alt="Product" />
                        <Dropzone onDrop={handleDrop}>
                            {({ getRootProps, getInputProps }) => (
                                <div {...getRootProps()} className='dropzone'>
                                    <input {...getInputProps()} />
                                    <p>Drag 'n' drop an image here, or click to select an image</p>
                                </div>
                            )}
                        </Dropzone>
                    </div>
                    <div>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formImage">
                                <Form.Label>Image</Form.Label>
                                <Form.Control as="select" value={selectedImage} onChange={handleImageChange}>
                                    {product.image_url?.map((imageUrl, index) => (
                                        <option key={index} value={imageUrl}>
                                            {`Image ${index + 1}`}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="name" value={product.name} onChange={() => { }} disabled />
                            </Form.Group>
                            <Form.Group controlId="formDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" name="description" value={product.description} onChange={() => { }} disabled />
                            </Form.Group>
                            <Form.Group controlId="formPrice">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" name="price" value={product.price} onChange={() => { }} disabled />
                            </Form.Group>
                            <Form.Group controlId="formStockQuantity">
                                <Form.Label>Stock Quantity</Form.Label>
                                <Form.Control type="number" name="stock_quantity" value={product.stock_quantity} onChange={() => { }} disabled />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Update Product
                            </Button>
                        </Form>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default EditProduct;
