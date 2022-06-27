const User = require("./user");
const Statistic = require("./statistic");
const StatisticRequest = require("./statisticRequest");

// associations

StatisticRequest.belongsTo(User);
Statistic.belongsTo(StatisticRequest);

module.exports = {
  User,
  Statistic,
  StatisticRequest,
};
