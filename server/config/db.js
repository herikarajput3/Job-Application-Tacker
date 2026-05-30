import mongoose from "mongoose";
import logger from "../utils/logger";

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        // console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        logger.log(error);
        // process.exit(1); // it is good for production not for testing
        throw error;
    }
};

export default connectDb;