const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const logger = require("morgan");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const db = require("./db");
const AuthMiddleware = require("./middlewares/auth");

// create store for sessions to persist in database
const sessionStore = new SequelizeStore({ db });

const { json, urlencoded } = express;

const app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
const path = require('path')

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../client/public')))

// AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/public/index.html'))
})

// require api routes here after I create them
app.use("/auth", require("./routes/auth"));
app.use("/api", AuthMiddleware, require("./routes/api"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = { app, sessionStore };
