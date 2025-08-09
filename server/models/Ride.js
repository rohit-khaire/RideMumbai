const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    pickup: String,
    destination: String,
    status: { type: String, default: 'pending' }
});

module.exports = mongoose.model('Ride', rideSchema);
