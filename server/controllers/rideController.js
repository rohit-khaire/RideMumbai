const Ride = require('../models/Ride');

exports.createRide = async (req, res) => {
    try {
        const ride = new Ride(req.body);
        await ride.save();
        res.status(201).json(ride);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllRides = async (req, res) => {
    try {
        const rides = await Ride.find();
        res.json(rides);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
