var express = require('express');
var moment = require('moment');
var router = express.Router();

var Student = require("../controllers/student").student;


/* GET users listing. */
router.get('/', function(req, res, next) {
	
	var newStudent = new Student({id : user.id, db : req.db})
	var params = newStudent.getToday(function(params) {
		res.render('student_home', params);
	});
});

module.exports = router;
