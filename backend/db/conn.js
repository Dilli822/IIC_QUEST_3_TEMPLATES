import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connection success.");
  } catch (error) {
    console.error("Failed to connect to DB!", error);
    process.exit(1);
  }
};

export default connectDB;
