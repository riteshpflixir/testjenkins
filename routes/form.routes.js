var express = require('express');
var router = express.Router();

let formCtrl = require('../controllers/file.controller')

//route to save form data
router.post('/addForm', function(req, res, next) {
  formCtrl.addFormData(req, res, next)
});

//route to get form data
router.get('/getFormData', function(req, res, next) {
  formCtrl.fetchFormData(req, res, next)
});

module.exports = router;