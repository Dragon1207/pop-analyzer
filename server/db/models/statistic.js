const Sequelize = require("sequelize");
const db = require("../db");

const Statistic = db.define("statistic", {
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
  },
  percentage: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
});

module.exports = Statistic;
