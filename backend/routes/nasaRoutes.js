const express = require("express");
const router = express.Router();
const { fetchNasa } = require("../controllers/nasaController");

router.get("/search", fetchNasa);

module.exports = router;
