require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { sequelize } = require("./config/database");

const app = express();

const routes = require("./routes/index");

// Helmet helps secure Express apps by setting HTTP response headers.
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

//* ROUTES
app.use(routes.authRouter);
app.use(routes.gameRouter);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server listening on port ${process.env.PORT || 4000}`);

  sequelize
    .authenticate()
    .then(() => {
      console.log("Running Database");
    })
    .catch((err) => {
      console.log(`Error connection to Database: ${err}`);
    });
});
