var express = require('express');
var moment = require('moment');
var router = express.Router();

var Student = require("../controllers/student").student;


/* GET users listing. */
router.get('/', function(req, res, next) {
	var newStudent = new Student({id : 1})
	var params = newStudent.getToday()
	res.render('student_home', params);
});

module.exports = router;
