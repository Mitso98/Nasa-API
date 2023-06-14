// Be careful logger is exported globally
require("./config/logger");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
const nasaRoute = require("./routes/nasaRoutes");
const cookieParser = require("cookie-parser");
const favRoutes = require("./routes/favRoutes");
const redisClient = require("./config/redis");

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
  global.PINO_LOGGER.info(`[${req.method}] ${req.url}`);
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

app.get("/store/:key/:value", (req, res) => {
  const { key, value } = req.params;
  redisClient.set(key, value, (err, reply) => {
    if (err) {
      res.status(500).send("Error storing data in Redis");
    } else {
      res.send(`Stored ${key}:${value}`);
    }
  });
});

app.get("/retrieve/:key", (req, res) => {
  const { key } = req.params;
  redisClient.get(key, (err, reply) => {
    if (err) {
      res.status(500).send("Error retrieving data from Redis");
    } else {
      res.send(`${key}:${reply}`);
    }
  });
});

// Connect to MongoDB and start the server
(async () => {
  try {
    await connectDB();
    startServer();
  } catch (error) {
    global.PINO_LOGGER.PINO_LOGGER.error("MongoDB connection error:", error);
  }
})();
