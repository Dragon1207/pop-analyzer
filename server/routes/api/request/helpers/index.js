const StatisticCalculator = require("./statisticCalculator");
const getCSVForm = require("./getCSVForm");

module.exports = {
  StatisticCalculator,
  getCSVForm,
  ...require("./calcPCT"),
};
