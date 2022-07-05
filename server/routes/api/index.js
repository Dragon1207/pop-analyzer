const router = require("express").Router();

router.use("/users", require("./user/userHandler"));
router.use("/requests", require("./request/requestHandler"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
