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
            const imageUrls = results[0].image_urls ? results[0].image_urls.split(',') : [];
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
    static updateProduct(productId, updatedProduct, callback) {
        const { name, description, price, stock_quantity, category_id, brand, images } = updatedProduct;

        // Bắt đầu một transaction
        connection.beginTransaction(async (err) => {
            if (err) {
                callback(err, null);
                return;
            }

            try {
                // Cập nhật thông tin sản phẩm trong bảng Products
                const updateProductQuery = `
                UPDATE Products
                SET name = ?, description = ?, price = ?, stock_quantity = ?, category_id = ?, brand = ?
                WHERE product_id = ?
            `;
                await connection.query(updateProductQuery, [name, description, price, stock_quantity, category_id, brand, productId]);

                // Xóa các hình ảnh hiện tại của sản phẩm trong bảng ProductImages
                const deleteImagesQuery = `
                DELETE FROM ProductImages
                WHERE product_id = ?
            `;
                await connection.query(deleteImagesQuery, [productId]);

                // Thêm các hình ảnh mới của sản phẩm vào bảng ProductImages
                if (images && images.length > 0) {
                    const insertImageQuery = `
                    INSERT INTO ProductImages (product_id, image_url, is_primary, description)
                    VALUES (?, ?, ?, ?)
                `;
                    for (const image of images) {
                        await connection.query(insertImageQuery, [productId, image.image_url, image.is_primary, image.description]);
                    }
                }

                // Commit transaction
                connection.commit((err) => {
                    if (err) {
                        connection.rollback(() => {
                            callback(err, null);
                        });
                    } else {
                        callback(null, 'Product updated successfully');
                    }
                });
            } catch (error) {
                // Rollback transaction in case of error
                connection.rollback(() => {
                    callback(error, null);
                });
            }
        });
    }



}

module.exports = Product;
