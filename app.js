var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require("body-parser");

var indexRouter = require('./routes/index');
var formRouter = require('./routes/form.routes');
var usersRouter = require('./routes/users');
const config = require("./config/config");

var app = express();

app.use(bodyParser.urlencoded({ limit: "50mb" }));

// parse requests of content-type - application/json
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const appRouter = require("./routes/app.routes");
appRouter.initialize(app);
/* Request Middleware */
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Headers", "token");
  res.header("Access-Control-Max-Age", "10000");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

mongoose.Promise = global.Promise;

//Database Connectivity
mongoose.connect(config.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
    if (err)
        throw err;
    else
    console.log("Successfully connected to the database:", config.dbUrl +' On Port:'+ config.serverPort);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
