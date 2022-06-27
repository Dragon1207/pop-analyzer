const db = require("./db");
const User = require("./models/user");
const Statistic = require("./models/statistic");
const StatisticRequest = require("./models/statisticRequest");

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  // const thomas = await User.create({
  //   username: "thomas",
  //   email: "thomas@email.com",
  //   password: "123456",
  //   photoUrl:
  //     "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914467/messenger/thomas_kwzerk.png",
  // });

  // const santiago = await User.create({
  //   username: "santiago",
  //   email: "santiago@email.com",
  //   password: "123456",
  //   photoUrl:
  //     "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914466/messenger/775db5e79c5294846949f1f55059b53317f51e30_s3back.png",
  // });

  console.log(`seeding ended`);
}

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

if (module === require.main) {
  runSeed();
}
