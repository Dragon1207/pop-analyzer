const getFreshNumber = require("../getFreshNumber");

module.exports = function (users) {
  // Split users by gender
  const femalePercentage =
    (users.filter((user) => user.gender === "female").length / users.length) *
    100;

  // Calculate PCT for each category
  return {
    Female: getFreshNumber(femalePercentage),
    Other: getFreshNumber(100 - femalePercentage),
  };
};
