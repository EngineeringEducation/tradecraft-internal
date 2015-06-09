var express = require('express');
var moment = require('moment');
var router = express.Router();

var Student = require("../models/student").student;


/* GET users homepage. */
router.get('/', function(req, res, next) {
	var newStudent = new Student({id : req.user.id, db : req.db})
	var params = newStudent.getToday(function(params) {
		params.user = req.user;
		res.render("student_home.html", params);
	});
});

module.exports = router;
