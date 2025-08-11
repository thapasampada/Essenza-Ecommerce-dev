import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";

// Configure environment variables
dotenv.config();

// Connect to database
connectDB();

// Create Express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // To accept JSON data
app.use(morgan("dev")); // Log requests in dev mode

// Debug middleware: logs every incoming request (optional, useful for debugging)
app.use((req, res, next) => {
  console.log(`Incoming ${req.method} request to: ${req.url}`);
  next();
});

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("<h1>ESSENZA Homepage</h1>");
});

// Port config
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(
    `Server Running in ${process.env.DEV_MODE || "development"} mode on port ${PORT}`
      .bgCyan.white
  );
});
