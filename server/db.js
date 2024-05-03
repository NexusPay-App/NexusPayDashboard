const mongoose = require('mongoose');

const connectDB = async () => {
    console.log(`Connecting to MongoDB at ${process.env.MONGO_URI}`);
    if (mongoose.connection.readyState !== 0) {
        console.log('MongoDB connection already established.');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
    }
};

module.exports = connectDB;
