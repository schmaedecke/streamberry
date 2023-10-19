const Sequelize = require("sequelize");

const connection = new Sequelize("streamberry", "root", "G3s9t9v7l8i01!", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

module.exports = connection;