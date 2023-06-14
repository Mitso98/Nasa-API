const { createClient } = require("@redis/client");

const client = createClient({
  host: "localhost",
  port: 6379,
});

client.connect().catch((error) => {
  global.PINO_LOGGER.PINO_LOGGER.error("Error connecting to Redis:", error);
});

client.on("error", (error) => {
  global.PINO_LOGGER.PINO_LOGGER.error("Redis error:", error);
});

module.exports = client;
