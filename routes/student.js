var express = require("express");
var moment = require("moment");
var router = express.Router();

var Student = require("../models/student");
var User = require("../models/user");


/* GET users homepage. */
router.get("/", function(req, res, next) {
	var params = {};

	


	res.render("student_home.html", params);
});

router.get("/profile", function (req, res) {
	res.render("student_profile.html", {"user": req.user});
})

module.exports = router;
