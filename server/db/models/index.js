const User = require("./user");
const Statistic = require("./statistic");

// associations

Statistic.belongsTo(User, {
  as: "user",
  onDelete: "cascade",
  foreignKey: "user_id",
});

User.hasMany(Statistic, {
  as: "statistics",
  onDelete: "cascade",
  foreignKey: "user_id",
});

module.exports = {
  User,
  Statistic,
};
