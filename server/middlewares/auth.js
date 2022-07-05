const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { User } = require("../db/models");

module.exports = function (req, res, next) {
  const token = req.headers["x-access-token"];
  if (token) {
    jwt.verify(token, process.env.SESSION_SECRET, (err, decoded) => {
      if (err) {
        return next();
      }
      User.findOne({
        where: { id: decoded.id },
      }).then((user) => {
        if (user && typeof user !== "string") req.user = user.toJSON();
        return next();
      });
    });
  } else {
    next(createError(401));
  }
};
