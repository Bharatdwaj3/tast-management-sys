import mongoose from 'mongoose';
import { MONGO_URI } from './env.config.js';

export const connectDB = async () => {
  console.log("Checking MongoDB URI:", MONGO_URI ? "Found" : "MISSING");
  
  try {
    await mongoose.connect(MONGO_URI, {
      bufferTimeoutMS: 30000,
      serverSelectionTimeoutMS: 30000,
    });
    
    console.log("MongoDB connected successfully");
    
    return new Promise((resolve) => {
      mongoose.connection.once('open', resolve);
    });
  } catch (err) {
    console.log("MongoDB connection failed!");
    console.log("Err name:", err.name);
    console.log("Err message:", err.message);
    console.log("Full err:", err);
    throw err; 
  }
};