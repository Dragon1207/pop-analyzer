const Sequelize = require("sequelize");

const db = new Sequelize(
  process.env.DATABASE_URL ||
    // "postgres://postgres:postgres@localhost:5432/population",
    "postgres://ptctkbycavtxfx:ab2f1a942775c8b9d8d21962d9774a18015f810f8264d9cd681f000d9f2fef97@ec2-3-226-163-72.compute-1.amazonaws.com:5432/de589bt99vsmpp",
  {
    logging: false,
  }
);

module.exports = db;
