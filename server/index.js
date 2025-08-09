const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { Server } = require('socket.io');

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('client/public'));

// DB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/rides', require('./routes/rideRoutes'));

// Socket.io
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('requestRide', (rideData) => {
        io.emit('newRideRequest', rideData);
    });

    socket.on('acceptRide', (rideData) => {
        io.emit('rideAccepted', rideData);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
