import mongoose from 'mongoose';
import { MONGO_URI } from './env.config.js';

export const connectDB = async () => {
  await mongoose.connect(MONGO_URI, {
    bufferTimeoutMS: 30000,
    serverSelectionTimeoutMS: 30000,
  });
  return new Promise((resolve) => {
    mongoose.connection.once('open', resolve);
  });
};

