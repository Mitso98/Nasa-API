const redis = require("redis");
const { REDIS_URI, REDIS_PORT } = process.env;

const redisClient = redis.createClient({
  url: REDIS_URI,
  port: REDIS_PORT,
});

redisClient.on("connect", () => {
  console.log("Redis client connected");
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

module.exports = redisClient;
