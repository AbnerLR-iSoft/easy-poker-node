const express = require("express");
const router = express.Router();

const { joiValidate } = require("../helpers");
const { getPlayersSchema } = require("../middlewares/joi");
const { validateJWT } = require("../middlewares/auth");
const { getPlayers } = require("../controllers");

router.get(
  "/players/:id",
  validateJWT,
  joiValidate(getPlayersSchema),
  getPlayers
);

module.exports = { userRouter: router };
