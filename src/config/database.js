const { Sequelize } = require("sequelize");

const { DATABASE, DB_USER, PASSWORD, HOST, PORT_DB } = process.env;

const sequelize = new Sequelize(DATABASE, DB_USER, PASSWORD, {
  host: HOST,
  port: PORT_DB,
  dialect: "mysql",
});

module.exports = { sequelize };
