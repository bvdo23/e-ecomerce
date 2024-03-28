// userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route để lấy tất cả người dùng
router.get('/customers', userController.getAllUsers);

module.exports = router;
