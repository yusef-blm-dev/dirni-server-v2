import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const { DATABASE_URI } = process.env;

export const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
