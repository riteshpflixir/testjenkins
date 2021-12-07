const employeesCtrl = require("../controllers/employee.controller");
var express = require("express");
var bodyParser = require("body-parser");
var employees = express.Router();
employees.use(bodyParser.json());

employees.route("/getAllEmployees").get(function (req, res, next) {
    employeesCtrl.fetchEmployeesList(req, res, next);
});

employees.route("/getEmployeeById").get(function (req, res, next) {
    employeesCtrl.fetchEmployeeListById(req, res, next);
});

employees.route("/editEmployee").put(function (req, res, next) {
    employeesCtrl.updateEmployee(req, res, next);
});

employees.route("/addEmployee").post(function (req, res, next) {
    employeesCtrl.addEmployees(req, res, next);
});

employees.route("/deleteEmployee").delete(function (req, res, next) {
    employeesCtrl.deleteEmployeeById(req, res, next);
});

module.exports = employees;