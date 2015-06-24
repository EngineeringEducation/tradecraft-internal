var express = require("express");
var moment = require("moment");
var router = express.Router();

var News = require("../models/news");
var User = require("../models/user");



/* GET users homepage. */
router.get("/", function(req, res, next) {
	req.locals = {};
	var queryCount = 1;
	var completedQueryCount = 0;

	News.find({}).sort({created: -1}).exec(function(err, news) {
		if (err) console.log(err);
		req.locals.news = news;
		completedQueryCount++;
		done();
	});

	
	

	function done () {
		if (queryCount == completedQueryCount) {
			res.render("student_home.html", req);
		}
	}
});

router.get("/student/onboarding", function(req, res) {
	res.render("onboarding.html", req);
});

router.get("/profile", function (req, res) {
	res.render("student_profile.html", req);
});

module.exports = router;
