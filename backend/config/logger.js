const pino = require("pino");
const prettyPrintStream = require("pino-pretty")();

const level = process.env.LOG_LEVEL || "info";

const logger = pino(
  {
    level,
  },
  prettyPrintStream
);

global.PINO_LOGGER = logger;
