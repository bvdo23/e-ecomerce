const mysql = require('mysql');
const config = require('../config');
const connection = mysql.createConnection(config.database);

class Product {
    static getAllProducts(callback) {
        const query = `
            SELECT Products.*, ProductImages.image_url 
            FROM Products 
            LEFT JOIN ProductImages ON Products.product_id = ProductImages.product_id;
        `;
        connection.query(query, (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, results);
        });
    }
}

module.exports = Product;
