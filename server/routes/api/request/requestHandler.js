const router = require("express").Router();
const { Statistic } = require("../../../db/models");
const { Op } = require("sequelize");
const axios = require("axios");
const {
  StatisticCalculator,
  getCSVForm,
  getPCTByAge,
  getPCTByName,
  getPCTByFemale,
} = require("./helpers");

const PCTengine = {
  byFemale: getPCTByFemale,
  byLastName: getPCTByName,
  byAge: getPCTByAge,
};

// find users by username
router.get("/", async (req, res, next) => {
  try {
    const userId = req.user.id;

    const statistics = await Statistic.findAll({
      where: {
        user_id: userId,
      },
      attributes: ["id", "created_at"],
      order: [["created_at", "DESC"]],
    });

    res.json(statistics);
  } catch (error) {
    next(error);
  }
});

router.post("/new", async (req, res, next) => {
  try {
    const { user } = req;
    const { desiredTypes } = req.body;
    const fakeUsers = (await axios("https://randomuser.me/api/?results=1000"))
      .data.results;
    const result = {};

    for (const [key, flag] of Object.entries(desiredTypes))
      if (flag)
        result[key] = new StatisticCalculator(PCTengine[key]).calc(fakeUsers);

    const newStatistic = (
      await Statistic.create({
        user_id: user.id,
        statistic: JSON.stringify(result),
      })
    ).toJSON();
    newStatistic.statistic = JSON.parse(newStatistic.statistic);

    res.json(newStatistic);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { format } = req.query;
    const statistic = (
      await Statistic.findOne({
        where: { id },
      })
    ).toJSON();
    statistic.statistic = JSON.parse(statistic.statistic);

    if (format === "json") {
      res.json(statistic);
    } else {
      const result = [];

      for (const [category, statistics] of Object.entries(
        statistic.statistic
      )) {
        const csvForm = getCSVForm(statistics, `By ${category.slice(2)}`);
        if (!result.length) result.push(...csvForm);
        else {
          for (let i = 0; i < csvForm.length; i++)
            result[i] += `,,,${csvForm[i]}`;
        }
      }

      res.json(result);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
