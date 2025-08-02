import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to MongoDB ${conn.connection.host}:${conn.connection.port}`)
    } catch (error) {
        console.log(`Error in mongodb ${error}`);
    }
}

export {connectDB}