const Product = require('../models/product');

exports.getAllProducts = (req, res) => {
    Product.getAllProducts((err, products) => {
        if (err) {
            res.status(500).json({ error: 'Đã xảy ra lỗi khi truy vấn cơ sở dữ liệu' });
            return;
        }

        const imageMap = new Map();
        products.forEach(product => {
            if (!imageMap.has(product.product_id)) {
                imageMap.set(product.product_id, []);
            }
            if (product.image_url) {
                imageMap.get(product.product_id).push(product.image_url);
            }
        });

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

exports.getProductById = (req, res) => {
    const productId = req.params.productId;
    Product.getProductById(productId, (err, product) => {
        if (err) {
            res.status(500).json({ error: 'Đã xảy ra lỗi khi truy vấn cơ sở dữ liệu' });
            return;
        }

        // Kiểm tra nếu image_url là null, đặt nó thành một mảng trống
        const imageUrls = product.image_url !== null ? (Array.isArray(product.image_url) ? product.image_url : [product.image_url]) : [];
        const productWithImages = {
            product_id: product.product_id,
            name: product.name,
            description: product.description,
            price: product.price,
            stock_quantity: product.stock_quantity,
            category_id: product.category_id,
            brand: product.brand,
            image_url: imageUrls
        };

        // Trả về đối tượng sản phẩm có chứa mảng image_urls đã xử lý
        res.json(productWithImages);
    });
};
exports.updateProduct = (req, res) => {
    const productId = req.params.productId;
    const updatedProduct = req.body;

    Product.updateProduct(productId, updatedProduct, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật sản phẩm' });
            return;
        }
        res.status(200).json({ message: 'Sản phẩm đã được cập nhật thành công' });
    });
};
exports.createProduct = (req, res) => {
    const newProduct = req.body;

    Product.createProduct(newProduct, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Đã xảy ra lỗi khi tạo sản phẩm' });
            return;
        }
        res.status(201).json({ message: 'Sản phẩm đã được tạo thành công' });
    });
};
