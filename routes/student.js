var express = require("express");
var moment = require("moment");
var router = express.Router();

var Announcements = require("../models/announcements");
var User = require("../models/user");



/* GET users homepage. */
router.get("/", function(req, res, next) {
	req.data = {};
	var queryCount = 1;
	var completedQueryCount = 0;

	Announcements.find({}).sort({created: -1}).exec(function(err, announcements) {
		if (err) {console.log(err);}
		req.data.announcements = announcements;
		completedQueryCount++;
		done();
	});




	function done () {
		if (queryCount === completedQueryCount) {
			res.render("student_home.html", req);
		}
	}
});

router.get("/onboarding", function(req, res) {
	console.log("On to onboarding page.");
	console.log("The user on this page: ", req.user);
	res.render("student/onboarding.html", req);
});

router.post("/onboarding", function(req, res) {
	console.log(req.body);
	User.findById(req.user._id, function(err, user) {
		if (err) {console.log(err);}
		user.emails.push(req.body.email);
		user.photos.push({"value": req.body.photo});
		user.track = req.body.track;
		user.cohort = req.body.cohort;
		user.phone.push(req.body.phone);
		user.social = {
			linkedin: req.body.linkedin,
			twitter: req.body.twitter,
			medium: req.body.medium,
			blog: req.body.blog,
			github: req.body.github
	    };
	    user.mtbi = req.body.MTBI;
	    user.bio = req.body.bio;
	    user.strengthsfinder = req.body.strengths;
	    user.save(function(err, user) {
			res.redirect("/student/profile");
		});
	});

});

router.get("/profile", function (req, res) {
	res.render("student/student_profile.html", req);
});

router.get("/dashboard", function(req, res) {
	res.render("dashboards/student.html", req);
});

module.exports = router;
