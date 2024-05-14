import React, { useState, useEffect } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Table, Button } from 'react-bootstrap';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import '../styles/dashboard.css';
import Header from '../components/Header';
function Dashboard() {
    const [salesData, setSalesData] = useState([]);
    const [revenueByCategoryData, setRevenueByCategoryData] = useState([]);
    const [topSellingProductsData, setTopSellingProductsData] = useState([]);

    useEffect(() => {
        // Lấy dữ liệu từ API và cập nhật state
        fetch('http://localhost:3000/api/sales')
            .then(response => response.json())
            .then(data => setSalesData(data));

        fetch('http://localhost:3000/api/revenue-by-category')
            .then(response => response.json())
            .then(data => setRevenueByCategoryData(data));

        fetch('http://localhost:3000/api/top-selling-products')
            .then(response => response.json())
            .then(data => setTopSellingProductsData(data));
    }, []);

    return (
        <div>
            <Header></Header>
            <div className="admin-container">
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
                    {/* <div className='dashboard-container'>
                        <div className='sale-label'>
                            <h2>Sales Over Time</h2>
                            <Line
                                data={{
                                    labels: salesData.map(item => item.date),
                                    datasets: [{
                                        label: 'Total Sales',
                                        data: salesData.map(item => parseFloat(item.total_sales)),
                                        fill: false,
                                        backgroundColor: 'rgba(75,192,192,0.2)',
                                        borderColor: 'rgba(75,192,192,1)',
                                        borderWidth: 2
                                    }]
                                }}
                            />
                        </div>

                        <div className='sale-Category'>
                            <h2>Revenue by Category</h2>
                            <Pie
                                data={{
                                    labels: revenueByCategoryData.map(item => item.category_name),
                                    datasets: [{
                                        data: revenueByCategoryData.map(item => parseFloat(item.total_revenue)),
                                        backgroundColor: [
                                            'rgba(255, 99, 132, 0.6)',
                                            'rgba(54, 162, 235, 0.6)'
                                        ]
                                    }]
                                }}
                            />

                        </div>

                    </div> */}
                    {/* <div className='sale-Selling'>
                        <h2>Top Selling Products</h2>
                        <Bar
                            data={{
                                labels: topSellingProductsData.map(item => item.product_name),
                                datasets: [{
                                    label: 'Quantity Sold',
                                    data: topSellingProductsData.map(item => parseInt(item.total_quantity_sold)),
                                    backgroundColor: 'rgba(75, 192, 192, 0.6)'
                                }]
                            }}
                        />
                    </div> */}
                    <div className='powerBiDb'>
                        <iframe title="ecomemer" width="1500" height="1000" src="https://app.powerbi.com/reportEmbed?reportId=682ffd80-4760-4bbd-b65c-bb15627b333f&autoAuth=true&embeddedDemo=true" frameborder="0" allowFullScreen="true"></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
