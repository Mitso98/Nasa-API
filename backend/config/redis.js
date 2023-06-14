const { createClient } = require("@redis/client");

const client = createClient({
  host: "localhost",
  port: 6379,
});

client.connect().catch((error) => {
  console.error("Error connecting to Redis:", error);
});

client.on("error", (error) => {
  console.error("Redis error:", error);
});

module.exports = client;
