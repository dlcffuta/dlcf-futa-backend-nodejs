import mongoose, { connect } from 'mongoose';
mongoose.set('strictQuery', false);

import { DATABASE_URI } from '../config';

const dbURI = DATABASE_URI;
const options: Record<string, unknown> = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export const connectDb = (): void => {
  connect(dbURI)
    .then(() => console.log('Database Connected'))
    .catch((err) => {
      console.log(err);
      console.log('Database connection failed. Exiting now...');
      process.exit();
    });
};
