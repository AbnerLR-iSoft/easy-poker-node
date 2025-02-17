const { response } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = (req, res = response, next) => {
  try {
    const token = req.header("x-token");

    if (!token) {
      return res.status(401).json({
        ok: false,
        msg: "No token provided",
      });
    }

    const { userId, username, email, createdAt } = jwt.verify(
      token,
      process.env.SECRET_JWT_SEED
    );

    req.userId = userId;
    req.username = username;
    req.email = email;
    req.createdAt = createdAt;

    next();
  } catch (error) {
    console.error(error);
    return (
      res.status(401),
      json({
        ok: false,
        msg: "Invalid token",
      })
    );
  }
};

module.exports = { validateJWT };
