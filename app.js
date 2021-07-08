require('dotenv/config');
const express = require("express");
const app = express();
//const postsRoute = require('./router/posts');
const mongoose = require('mongoose');
const authRoute = require('./routes/user-auth');
const userRoute = require('./routes/user');
const adRoute = require('./routes/ad');

const conn = process.env.MONGODB_URI;

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
connectDB();


app.use(express.json());


//My middlewares

//app.use('/user',authRouter);



app.use("/api/auth",authRoute);
app.use("/api/user",userRoute);
app.use("/api/ad/",adRoute);



app.listen(3000, (error) => {
    if (error) throw error;
    console.log(`> Ready on http://localhost:${3000}`);
  });