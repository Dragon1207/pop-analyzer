const Sequelize = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../db");

const Statistic = db.define(
  "Statistic",
  {
    statistic: { type: DataTypes.TEXT },
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true,
    underscored: true,
    tableName: "statistic",
  }
);

module.exports = Statistic;
