import mongoose from "mongoose";
import { ENV } from "../const";

export const dbConnect = () =>
  mongoose
    // .connect( 'mongodb://root:example@mongo:27017')
    .connect(ENV.MONGO_URI)
    .then(() => console.info(`MongoDB connected`))
    .catch((err) => console.error(`MongoDB connection error: ${err}`));