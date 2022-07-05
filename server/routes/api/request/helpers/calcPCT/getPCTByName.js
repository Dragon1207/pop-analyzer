const getFreshNumber = require("../getFreshNumber");

module.exports = function (users) {
  // Split users by name
  const lastNameNToZPercentage =
    (users.filter((user) => /^[N-Z]/.test(user.name.last)).length /
      users.length) *
    100;

  // Calculate PCT for each category
  return {
    "N-Z": getFreshNumber(lastNameNToZPercentage),
    "A-M": getFreshNumber(100 - lastNameNToZPercentage),
  };
};
