import mongoose from "mongoose";

const connectMongoDB = async () => {
  const mongoURI = process.env.MONGODB_URI || undefined;
  if (!mongoURI) {
    throw new Error("MongoDB URI is not defined");
  }
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;
