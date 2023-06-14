const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
const nasaRoute = require("./routes/nasaRoutes");
const cookieParser = require("cookie-parser");
const favRoutes = require("./routes/favRoutes");
const logger = require("./config/logger");

// Load environment variables
dotenv.config();
const { PORT } = process.env || 3001;

// Initialize the app
const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use((req, res, next) => {
  logger.info(`[${req.method}] ${req.url}`);
  next();
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/nasa", nasaRoute);
app.use("/api/favorites", favRoutes);

// Function to start the server after a successful database connection
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

// Connect to MongoDB and start the server
(async () => {
  try {
    await connectDB();
    startServer();
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
})();
