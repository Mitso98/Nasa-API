const express = require("express");
const authenticateToken = require("../middlewares/authenticateToken");
const favController = require("../controllers/favController");
const router = express.Router();

router.post("/add", authenticateToken, favController.addFavorite);
router.delete("/delete/:id", authenticateToken, favController.removeFavorite);
router.get("/get", authenticateToken, favController.getAllFavorites);

module.exports = router;
