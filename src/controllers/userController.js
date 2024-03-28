// userController.js

const mysql = require('mysql');
const config = require('../config');

// Kết nối đến cơ sở dữ liệu
const connection = mysql.createConnection(config.database);

// Hàm lấy tất cả người dùng từ cơ sở dữ liệu
exports.getAllUsers = (req, res) => {
    const query = 'SELECT * FROM customers'; // Giả sử bảng người dùng có tên là 'users'
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.status(200).json(results);
    });
};
