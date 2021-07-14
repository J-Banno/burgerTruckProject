var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");

var app = express();

//Routes
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var registerRouter = require("./routes/register");

//Mongoose : connection db
const mongoose = require("mongoose");
mongoose.connect(`mongodb://localhost:27017/burgerTruck`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var loginRouter = require("./routes/login");

//Middleware
var cors = require("./middleware/cors");

app.use(cors.handle);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//Url
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/registration", registerRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
