const getFreshNumber = require("../getFreshNumber");

module.exports = function (users) {
  const femalePercentage =
    (users.filter((user) => user.gender === "female").length / users.length) *
    100;

  return {
    Female: getFreshNumber(femalePercentage),
    Other: getFreshNumber(100 - femalePercentage),
  };
};
