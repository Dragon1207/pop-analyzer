const getFreshNumber = require("../getFreshNumber");

function getLevel(number) {
  const levelLimit = [16, 26, 46, 66, 86];
  if (number < 0) throw new Error("Age can't be negative");

  for (let i = 0; i < levelLimit.length; i++)
    if (number < levelLimit[i]) return i;

  return levelLimit.length;
}

module.exports = function (users) {
  const keyPerLevel = ["< 16", "16-25", "26-45", "46-65", "66-85", "86 <"];
  const agePercentage = users.reduce(
    (totCount, user) => {
      const userKey = keyPerLevel[getLevel(user.dob.age)];
      return { ...totCount, [userKey]: totCount[userKey] + 1 };
    },
    keyPerLevel.reduce((totLevel, key) => {
      return { ...totLevel, [key]: 0 };
    }, {})
  );

  for (const key of Object.keys(agePercentage))
    agePercentage[key] = getFreshNumber(
      (agePercentage[key] / users.length) * 100
    );

  return agePercentage;
};
