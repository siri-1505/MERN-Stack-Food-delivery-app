require('dotenv').config();
const express = require('express');
const connectDB = require('./db/ConnectDB');
const userRouter = require('./Routes/userRoute'); 
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware to parse JSON and cookies
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true // Allow cookies to be sent and received
}));

app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running at port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
};

startServer();

app.use('/api/users', userRouter);
