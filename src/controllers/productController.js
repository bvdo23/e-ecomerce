const Product = require('../models/product');

exports.getAllProducts = (req, res) => {
    Product.getAllProducts((err, products) => {
        if (err) {
            res.status(500).json({ error: 'Đã xảy ra lỗi khi truy vấn cơ sở dữ liệu' });
            return;
        }

        // Tạo một đối tượng Map để nhóm các hình ảnh theo product_id
        const imageMap = new Map();
        products.forEach(product => {
            if (!imageMap.has(product.product_id)) {
                imageMap.set(product.product_id, []);
            }
            if (product.image_url) {
                imageMap.get(product.product_id).push(product.image_url);
            }
        });

        // Tạo một mảng mới với các sản phẩm và các hình ảnh được nhóm lại
        const productsWithImages = [];
        products.forEach(product => {
            if (!productsWithImages.some(p => p.product_id === product.product_id)) {
                productsWithImages.push({
                    product_id: product.product_id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    stock_quantity: product.stock_quantity,
                    category_id: product.category_id,
                    brand: product.brand,
                    image_url: imageMap.get(product.product_id) || []
                });
            }
        });

        res.json(productsWithImages);
    });
};
