const Sequelize = require("sequelize");

const db = new Sequelize(
  process.env.DATABASE_URL ||
    // "postgres://postgres:postgres@localhost:5432/population",
    "postgres://sxxstekoovqtur:c55e52d09cdd3dd444945b53194a5afc7070c9c6b5d1a757ce15287752ce0aaa@ec2-34-233-115-14.compute-1.amazonaws.com:5432/ddpi80mhfed5ec",
  {
    logging: false,
  }
);

module.exports = db;
