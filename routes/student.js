var express = require("express");
var moment = require("moment");
var router = express.Router();

var News = require("../models/news");
var User = require("../models/user");



/* GET users homepage. */
router.get("/", function(req, res, next) {
	var params = {};
	var queryCount = 1;
	var completedQueryCount = 0;

	News.find({}).sort({created: -1}).exec(function(err, news) {
		if (err) console.log(err);
		params.news = news;
		completedQueryCount++;
		done(params);
	});
	

	function done (params) {
		if (queryCount == completedQueryCount) {
			res.render("student_home.html", params);
		}
	}
});

router.get("/profile", function (req, res) {
	res.render("student_profile.html", {"user": req.user});
})

module.exports = router;
