var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");
const bodyParser = require("body-parser");

var app = express();

//Routes
var indexRouter = require("./routes/index");
var registerRouter = require("./routes/register");
var productsRouter = require("./routes/products");
var loginRouter = require("./routes/login");
var adminRouter = require("./routes/admin");
var checkoutRouter = require("./routes/stripe");
var orderRouter = require("./routes/order");
var ordersUserRouter = require("./routes/ordersUser");

//Module db
const dbConfig = require("./config/db.config");

//Mongoose : connection db
const mongoose = require("mongoose");
mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Middleware
var cors = require("./middleware/cors");
var auth = require("./middleware/auth");
var checkingPermissions = require("./middleware/checkingPermissions");

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors.handle);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//Url
app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/registration", registerRouter);
app.use("/products", productsRouter);
app.use("/admin", auth, checkingPermissions("ROLE_ADMIN"), adminRouter);
app.use("/checkout", auth, checkingPermissions("ROLE_USER"), checkoutRouter);
app.use("/order", orderRouter);
app.use(
  "/ordersUser",
  auth,
  checkingPermissions("ROLE_USER"),
  ordersUserRouter
);

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
