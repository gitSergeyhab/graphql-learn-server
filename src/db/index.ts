import mongoose from 'mongoose';
import { ENV } from '../const';

const mongoURI = ENV.MONGO_URI;
export const dbConnect = () =>
  mongoose
    .connect(mongoURI)
    .then(() => console.info(`MongoDB connected, URI: ${mongoURI}`))
    .catch(err => console.error(`MongoDB connection error: ${err}`));
