import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 4000,
  ME_CONFIG_MONGODB_URL: process.env.ME_CONFIG_MONGODB_URL,
  MONGO_URI: process.env.MONGO_URI
};