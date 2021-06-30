import mongoose from 'mongoose';

const conn = process.env.DB_CONNECTION;
const connectDB = async () => {
  try {
    await mongoose.connect(conn, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to database");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
export default connectDB;