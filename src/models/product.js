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

    static getProductById(productId, callback) {
        const query = `
        SELECT 
            Products.*,
            GROUP_CONCAT(ProductImages.image_url) AS image_urls
        FROM Products 
        LEFT JOIN ProductImages ON Products.product_id = ProductImages.product_id
        WHERE Products.product_id = ?
        GROUP BY Products.product_id;
    `;
        connection.query(query, [productId], (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            if (results.length === 0) {
                const errorMessage = "Product not found";
                callback(errorMessage, null);
                return;
            }
            // Chia chuỗi thành mảng các URL hình ảnh
            const imageUrls = results[0].image_urls ? results[0].image_urls.split(',') : [];
            // Tạo đối tượng sản phẩm với mảng URL hình ảnh đã xử lý
            const productWithImages = {
                product_id: results[0].product_id,
                name: results[0].name,
                description: results[0].description,
                price: results[0].price,
                stock_quantity: results[0].stock_quantity,
                category_id: results[0].category_id,
                brand: results[0].brand,
                image_url: imageUrls
            };
            callback(null, productWithImages);
        });
    }


    //     static updateProduct(productId, updatedData, callback) {
    //         const { name, description, price, stock_quantity } = updatedData;
    //         const query = `
    //             UPDATE Products
    //             SET name = ?, description = ?, price = ?, stock_quantity = ?
    //             WHERE product_id = ?;
    //         `;
    //         const values = [name, description, price, stock_quantity, productId];
    //         connection.query(query, values, (err, results) => {
    //             if (err) {
    //                 callback(err);
    //                 return;
    //             }
    //             callback(null);
    //         });
    //     }
}

module.exports = Product;
