const Sequelize = require("sequelize");
const connection = require("./database");

const MovieDB = connection.define("movieList", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  genre: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  rate:{
    type:Sequelize.INTEGER,
    allowNull: false,
  },
  year:{
    type:Sequelize.INTEGER,
    allowNull:false,
  },
});

MovieDB.sync({ force: false }).then(() => {});

module.exports = MovieDB;