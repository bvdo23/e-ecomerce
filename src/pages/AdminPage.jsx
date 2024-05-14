import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/adminpage.css';
import { useNavigate } from 'react-router-dom';

function AdminPage() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const editProduct = (productId) => {
        alert("Editing product with ID: " + productId);
        navigate(`/edit-product/${productId}`);
    };

    const deleteProduct = async (productId) => {
        try {
            alert("Do you want delete product with ID: " + productId);
            const response = await fetch(`http://localhost:3000/api/products/delete/${productId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete product');
            }

            // Remove the deleted product from the state
            setProducts(prevProducts => prevProducts.filter(product => product.product_id !== productId));

            // Product deleted successfully
            console.log('Product deleted successfully');
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div>
            <Header />
            <div className="admin-container" >
                <div className="admin-menu">
                    <div>
                        <Button variant="light" href='admin'>
                            <h5>Quản lý sản phẩm</h5>
                        </Button>
                    </div>
                    <div>
                        <Button variant="light" href='dashboard'>
                            <h5>Xem thống kê</h5>
                        </Button>
                    </div>
                    <div>
                        <Button variant="light" href='add-products'>
                            <h5>Thêm sản phẩm</h5>
                        </Button>
                    </div>
                </div>
                <div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Stock Quantity</th>
                                <th>Brand</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.product_id}>
                                    <td>{product.product_id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                    <td>{product.stock_quantity}</td>
                                    <td>{product.brand}</td>
                                    <td><Button variant="primary" onClick={() => editProduct(product.product_id)}>Edit</Button></td>
                                    <td><Button variant="danger" onClick={() => deleteProduct(product.product_id)}>Delete</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;
