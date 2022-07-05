const Sequelize = require("sequelize");

const db = new Sequelize(
  process.env.DATABASE_URL ||
    // "postgres://postgres:postgres@localhost:5432/population",
    "postgres://jylevbqsmiaunr:7b72fe0846ae5053af5a6c8913ce3a614c3dcae7964460326f90dfdb68320b93@ec2-44-198-82-71.compute-1.amazonaws.com:5432/d8n7881o76u38f",
  {
    logging: false,
  }
);

module.exports = db;
