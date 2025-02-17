const jwt = require("jsonwebtoken");

const generateJWT = (user) => {
  return new Promise((resolve, reject) => {
    const payload = user;

    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: "2d",
      },
      (err, token) => {
        if (err) {
          reject("No token");
        }
        resolve(token);
      }
    );
  });
};

module.exports = { generateJWT };
