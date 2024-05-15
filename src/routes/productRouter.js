const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const bodyParser = require('body-parser');
const Product = require('../models/product.js');



router.use(bodyParser.json()); // Di chuyển bodyParser vào đây

router.get('/', productController.getAllProducts);
router.get('/:productId', productController.getProductById);
router.put('/update/:productId', productController.updateProduct);
router.post('/create', productController.createProduct);
module.exports = router;







