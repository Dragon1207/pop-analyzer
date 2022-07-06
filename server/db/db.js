const Sequelize = require("sequelize");

const db = new Sequelize(
  process.env.DATABASE_URL ||
    // "postgres://postgres:postgres@localhost:5432/population",
    "postgres://ggasnuadbwhkrp:bf430ef220df4299010645b8984c0721373de79bc5d379b6b99e1d277faae634@ec2-34-225-159-178.compute-1.amazonaws.com:5432/dbm88fkif79epo",
    
  {
    logging: false,
    dialectOptions: {
      ssl: {
          rejectUnauthorized: false
      }
    }
  }
);

module.exports = db;
