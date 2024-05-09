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
        const { name, description, price, stock_quantity, category_id, brand, image_url } = updatedProduct;

        if (!name || !description || !price || !stock_quantity || !category_id || !brand || !image_url) {
            const errorMessage = "Thiếu thông tin bắt buộc";
            callback(errorMessage, null);
            return;
        }

        connection.beginTransaction(async (err) => {
            if (err) {
                callback(err, null);
                return;
            }

            try {
                const updateProductQuery = `
                    UPDATE Products
                    SET name = ?, description = ?, price = ?, stock_quantity = ?, category_id = ?, brand = ?
                    WHERE product_id = ?
                `;
                await connection.query(updateProductQuery, [name, description, price, stock_quantity, category_id, brand, productId]);

                const deleteImagesQuery = `
                    DELETE FROM ProductImages
                    WHERE product_id = ?
                `;
                await connection.query(deleteImagesQuery, [productId]);

                if (image_url && image_url.length > 0) {
                    const insertImageQuery = `
                        INSERT INTO ProductImages (product_id, image_url)
                        VALUES (?, ?)
                    `;
                    for (const imageUrl of image_url) {
                        await connection.query(insertImageQuery, [productId, imageUrl]);
                    }
                }

                connection.commit((err) => {
                    if (err) {
                        connection.rollback(() => {
                            callback(err, null);
                        });
                    } else {
                        callback(null, 'Sản phẩm đã được cập nhật thành công');
                    }
                });
            } catch (error) {
                connection.rollback(() => {
                    callback(error, null);
                });
            }
        });
    }

    static createProduct(newProduct, callback) {
        const { name, description, price, stock_quantity, category_id, brand, image_url } = newProduct;

        if (!name || !description || !price || !stock_quantity || !category_id || !brand || !image_url) {
            const errorMessage = "Thiếu thông tin bắt buộc";
            callback(errorMessage, null);
            return;
        }

        connection.beginTransaction((err) => {
            if (err) {
                callback(err, null);
                return;
            }

            const createProductQuery = `
            INSERT INTO Products (name, description, price, stock_quantity, category_id, brand)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
            connection.query(createProductQuery, [name, description, price, stock_quantity, category_id, brand], (err, createProductResult) => {
                if (err) {
                    connection.rollback(() => {
                        callback(err, null);
                    });
                    return;
                }

                const productId = createProductResult.insertId;
                console.log(productId);

                if (image_url && image_url.length > 0) {
                    const insertImageQuery = `
                    INSERT INTO ProductImages (product_id, image_url)
                    VALUES (?, ?)
                `;
                    image_url.forEach(imageUrl => {
                        connection.query(insertImageQuery, [productId, imageUrl], (err) => {
                            if (err) {
                                connection.rollback(() => {
                                    callback(err, null);
                                });
                                return;
                            }
                        });
                    });
                }

                connection.commit((err) => {
                    if (err) {
                        connection.rollback(() => {
                            callback(err, null);
                        });
                    } else {
                        callback(null, 'Sản phẩm đã được tạo thành công');
                    }
                });
            });
        });
    }


    static deleteProduct(productId, callback) {
        connection.beginTransaction(async (err) => {
            if (err) {
                callback(err, null);
                return;
            }

            try {
                const deleteImagesQuery = `DELETE FROM ProductImages WHERE product_id = ?`;
                await connection.query(deleteImagesQuery, [productId]);

                const deleteProductQuery = `DELETE FROM Products WHERE product_id = ?`;
                await connection.query(deleteProductQuery, [productId]);

                connection.commit((err) => {
                    if (err) {
                        connection.rollback(() => {
                            callback(err, null);
                        });
                    } else {
                        callback(null, 'Sản phẩm và các ảnh liên quan đã được xóa thành công');
                    }
                });
            } catch (error) {
                connection.rollback(() => {
                    callback(error, null);
                });
            }
        });
    }

}

module.exports = Product;
