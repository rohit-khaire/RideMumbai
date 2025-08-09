const express = require('express');
const { createSubscription, verifyPayment } = require('../controllers/paymentController');
const router = express.Router();

router.post('/subscribe', createSubscription);
router.post('/verify', verifyPayment);

module.exports = router;
