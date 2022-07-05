const getFreshNumber = require("../getFreshNumber");

module.exports = function (users) {
  const lastNameNToZPercentage =
    (users.filter((user) => /^[N-Z]/.test(user.name.last)).length /
      users.length) *
    100;

  return {
    "N-Z": getFreshNumber(lastNameNToZPercentage),
    "A-M": getFreshNumber(100 - lastNameNToZPercentage),
  };
};
