const express = require("express");
const router = express.Router();

const { joiValidate } = require("../helpers");
const { loginSchema, signupSchema } = require("../middlewares/joi");
const { validateJWT } = require("../middlewares/auth");
const { login, signup, revalidateToken } = require("../controllers");

router.post("/login", joiValidate(loginSchema), login);
router.post("/signup", joiValidate(signupSchema), signup);
router.get("/auth", validateJWT, revalidateToken);

module.exports = { authRouter: router };
