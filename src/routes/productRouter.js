const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const bodyParser = require('body-parser');
const Product = require('../models/product.js');



router.use(bodyParser.json());

router.get('/', productController.getAllProducts);
router.get('/:productId', productController.getProductById);
router.put('/update/:productId', productController.updateProduct);
router.post('/create', productController.createProduct);
router.delete('/delete/:productId', productController.deleteProduct);
module.exports = router;







