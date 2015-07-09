var express = require('express');
var router = express.Router();

var Curriculum = require("../models/curriculum");

router.get("/", function(req, res) {
	req.data = {
		schedule : [
			{day: "Monday", start:"9:30", end: "11:30", points: 2},
			{day: "Tuesday", start:"9:30", end: "11:30", points: 2},
			{day: "Wednesday", start:"10:00", end: "11:00", points: 1},
			{day: "Thursday", start:"9:30", end: "11:30", points: 2}
		]
	};

	Curriculum.find({}).exec(function(err, curriculum) {
		console.log(curriculum);
		req.data.curriculum = curriculum;
		res.render("planning/planning.html", req);
	});

	
});

module.exports = router;