const express = require("express");
const router = express.Router();

// const { joiValidate } = require("../helpers");
// const { loginSchema, signupSchema } = require("../middlewares/joi");
// const { validateJWT } = require("../middlewares/auth");
const { startGame } = require("../controllers");

router.post("/game", startGame);

module.exports = { gameRouter: router };
