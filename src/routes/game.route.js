const express = require("express");
const router = express.Router();

const { joiValidate } = require("../helpers");
const { startGameSchema } = require("../middlewares/joi");
// const { validateJWT } = require("../middlewares/auth");
const { startGame, getHistory } = require("../controllers");

router.post("/game", joiValidate(startGameSchema), startGame);
router.get("/game", getHistory);

module.exports = { gameRouter: router };
