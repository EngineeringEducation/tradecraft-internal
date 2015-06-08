var express = require('express');
var moment = require('moment');
var router = express.Router();

var Student = require("../controllers/student").student;


/* GET users listing. */
router.get('/', function(req, res, next) {
	console.log(req.user);
	var newStudent = new Student({id : user.id, db : req.db})
	var params = newStudent.getToday(function(params) {
		params.user = req.user;
		res.render('student_home', params);
	});
});

module.exports = router;
