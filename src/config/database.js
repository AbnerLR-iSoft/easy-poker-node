const { Sequelize } = require("sequelize");

const { DATABASE, USER, PASSWORD, HOST, PORT_DB } = process.env;

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
  host: HOST,
  port: PORT_DB,
  dialect: "mysql",
});

module.exports = { sequelize };
