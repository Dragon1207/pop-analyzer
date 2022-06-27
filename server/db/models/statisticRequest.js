const Sequelize = require("sequelize");
const db = require("../db");

const StatisticRequest = db.define("statistic_request", {
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = StatisticRequest;
