const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/create_payment_url', paymentController.createPayment);

router.get('/vnpay_return', paymentController.vnpayReturn);

router.get('/vnpay_ipn', paymentController.vnpayIPN);

router.post('/querydr', paymentController.querydr);

router.post('/refund', paymentController.refund);


module.exports = router;