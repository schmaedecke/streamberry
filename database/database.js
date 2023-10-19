const Sequelize = require("sequelize");

const connection = new Sequelize("streamberry", "root", "Keyworks123!", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

module.exports = connection;