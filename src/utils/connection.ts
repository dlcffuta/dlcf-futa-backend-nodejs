import mongoose from "mongoose";

import { DATABASE_URI } from "../config";


export const connectDb = async () => {
  try {
    await mongoose.connect(DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.error(new Error(error));
  }
};


