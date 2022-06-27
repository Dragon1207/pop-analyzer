const Sequelize = require("sequelize");

const db = new Sequelize(
  process.env.DATABASE_URL ||
    "postgres://corey:password@localhost:5432/population",
  {
    logging: false,
  }
);

module.exports = db;
