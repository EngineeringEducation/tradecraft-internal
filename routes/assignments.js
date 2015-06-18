var express = require("express");
var moment = require("moment");
var router = express.Router();

var Student = require("../models/student");
var User = require("../models/user");



router.get("/", function(req, res) {
	res.render("assignments/show.html", {user: req.user});
});

/* GET new assignment maker */
router.get("/new", function(req, res) {
	res.render("assignments/new.html", {user: req.user});
});



module.exports = router;