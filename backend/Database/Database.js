import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://utkarshsingh500500:AvNQD31mJn4ATxf2@cluster0.zhpzk7l.mongodb.net/gym', {
            // useNewUrlParser: true,
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB: %o', err);
        process.exit(1);
    }

    mongoose.connection.on('error', err => {
        console.error('MongoDB connection error: %o', err);
    });

    mongoose.connection.on('disconnected', () => {
        console.warn('MongoDB connection lost. Reconnecting...');
        connectDB();
    });
};

export default connectDB
