// es.js
const { Client } = require("@elastic/elasticsearch");
const dotenv = require("dotenv");

dotenv.config();
const { ELASTIC_PORT } = process.env;
const client = new Client({
  node: `http://localhost:${ELASTIC_PORT}`,
});

client.ping((error) => {
  if (error) {
    console.error("Elasticsearch cluster is down!");
  } else {
    console.log("Elasticsearch cluster is up and running");
  }
});

module.exports = client;
