const mysql = require('mysql2/promise');
const config = require('../config');
const router = require('express').Router();
const plotly = require('plotly')('username', 'API key');


// Tạo pool kết nối
const pool = mysql.createPool(config.database);

// Hàm này sẽ trả về một kết nối từ pool
async function getConnection() {
    return await pool.getConnection();
}

// Route API để lấy doanh số bán hàng
router.get('/sales', async (req, res) => {
    try {
        const connection = await getConnection(); // Lấy kết nối từ pool
        const query = `
            SELECT DATE(order_date) AS date, SUM(total_amount) AS total_sales
            FROM Orders
            GROUP BY DATE(order_date)
        `;
        const [rows] = await connection.execute(query); // Thực hiện truy vấn
        res.json(rows);
        connection.release(); // Đảm bảo trả lại kết nối cho pool sau khi sử dụng
    } catch (error) {
        console.error('Error fetching sales data:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});

router.get('/top-selling-products', async (req, res) => {
    try {
        const connection = await getConnection(); // Lấy kết nối từ pool
        const query = `
            SELECT 
                Products.product_id, 
                Products.name AS product_name, 
                SUM(OrderDetails.quantity) AS total_quantity_sold
            FROM OrderDetails
            INNER JOIN Products ON OrderDetails.product_id = Products.product_id
            GROUP BY Products.product_id
            ORDER BY total_quantity_sold DESC
            LIMIT 5
        `;
        const [rows] = await connection.execute(query); // Thực hiện truy vấn
        res.json(rows);
        connection.release(); // Đảm bảo trả lại kết nối cho pool sau khi sử dụng
    } catch (error) {
        console.error('Error fetching top selling products:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});

router.get('/revenue-by-category', async (req, res) => {
    try {
        const connection = await getConnection(); // Lấy kết nối từ pool
        const query = `
            SELECT 
                Categories.name AS category_name, 
                SUM(OrderDetails.quantity * Products.price) AS total_revenue
            FROM OrderDetails
            INNER JOIN Products ON OrderDetails.product_id = Products.product_id
            INNER JOIN Categories ON Products.category_id = Categories.category_id
            GROUP BY Categories.category_id
        `;
        const [rows] = await connection.execute(query); // Thực hiện truy vấn
        res.json(rows);
        connection.release(); // Đảm bảo trả lại kết nối cho pool sau khi sử dụng
    } catch (error) {
        console.error('Error fetching revenue by category:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});

router.get('/orders-revenue-by-customer', async (req, res) => {
    try {
        const connection = await getConnection(); // Lấy kết nối từ pool
        const query = `
            SELECT 
                customer_id, 
                COUNT(*) AS total_orders, 
                SUM(total_amount) AS total_revenue
            FROM Orders
            GROUP BY customer_id
        `;
        const [rows] = await connection.execute(query); // Thực hiện truy vấn
        res.json(rows);
        connection.release(); // Đảm bảo trả lại kết nối cho pool sau khi sử dụng
    } catch (error) {
        console.error('Error fetching orders and revenue by customer:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});



module.exports = router;
