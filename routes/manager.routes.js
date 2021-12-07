const managerCtrl = require("../controllers/manager.controller");
var express = require("express");
var bodyParser = require("body-parser");
var manager = express.Router();
var middleware = require("./app.routes");
manager.use(bodyParser.json());

manager.route("/login").post(function (req, res, next) {
    managerCtrl.managerLogin(req, res, next);
});

manager.route("/register").post(function (req, res, next) {
    managerCtrl.registerManager(req, res, next);
});

module.exports = manager;