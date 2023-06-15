const { createClient } = require("@redis/client");

const client = createClient({
  host: "localhost",
  port: 6379,
});

client
  .connect()
  .then(() => {
    console.log("Successfully connected to Redis");
  })
  .catch((error) => {
    console.error("Error connecting to Redis:", error);
    process.exit(1);
  });

module.exports = client;
