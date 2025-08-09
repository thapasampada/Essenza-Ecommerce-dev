import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from "./routes/categoryRoutes.js";
import cors from 'cors';

//configure env
dotenv.config();

//database
connectDB();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json()); //to accept json data
app.use(morgan('dev')); //to log requests in development mode

// Debug middleware — logs every incoming request
app.use((req, res, next) => {
  console.log(`Incoming ${req.method} request to: ${req.url}`);
  next();
});

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);

//rest api
app.get('/', (req, res) => {
  res.send('<h1>ESSENZA Homepage</h1>');
});

//secure port
const PORT = process.env.PORT || 8081;

//run listen
app.listen(PORT, () => {
  console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});
