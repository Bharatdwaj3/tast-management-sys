import mongoose from 'mongoose';
import { MONGO_URI } from './env.config.js';

export const connectDB = async () => {
  console.log("🔍 Checking MongoDB URI:", MONGO_URI ? "✅ Found" : "❌ MISSING");
  
  try {
    await mongoose.connect(MONGO_URI, {
      bufferTimeoutMS: 30000,
      serverSelectionTimeoutMS: 30000,
    });
    
    console.log("✅ MongoDB connected successfully");
    
    return new Promise((resolve) => {
      mongoose.connection.once('open', resolve);
    });
  } catch (error) {
    console.log("❌ MongoDB connection failed!");
    console.log("Error name:", error.name);
    console.log("Error message:", error.message);
    console.log("Full error:", error);
    throw error; // Re-throw so server.js knows it failed
  }
};