import dotenv from "dotenv";
dotenv.config({});

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI ||
        "your-mongo-URI"
    );

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    console.log("Mongo DB not connected: ", error);
    process.exit();
  }
};

export default connectDB;
