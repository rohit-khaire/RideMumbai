const express = require('express');
const { createRide, getAllRides } = require('../controllers/rideController');
const router = express.Router();

router.post('/', createRide);
router.get('/', getAllRides);

module.exports = router;
