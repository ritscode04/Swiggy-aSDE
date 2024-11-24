const express = require("express");
const { startBattle } = require("../controllers/gameController");
const router = express.Router();

router.post("/battle", startBattle);

module.exports = router;
