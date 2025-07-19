import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';

//configure env
dotenv.config();

//database
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json()); //to accept json data
app.use(morgan('dev')); //to log requests in development mode

//rest api
app.get('/', (req, res) => {
  res.send('<h1>ESSENZA Homepage</h1>');
});

//secure port
const PORT = process.env.PORT || 8081;

//run listen
app.listen(PORT,() => {
    console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});