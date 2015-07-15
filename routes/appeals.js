// routes/appeal.js
// you send an appeal when you are lost and need help from someone who knows better.

var express = require('express');
var router = express.Router();
var _ = require('underscore');

var Appeal = require("../models/appeals");

router.get("/new", function(req, res, next) {
	var appeal = new Appeal({
		author:req.user._id
	});
	appeal.save(function(err, appeal) {
		if (err) {console.log(err)};
		res.send(appeal);
	});
});

router.get("/", function(req, res, next) {
	Appeal.find({})
	.populate("author")
	.exec(function(err, appeals) {
		res.send(appeals);
	});
});


router.get('/:id', function(req, res, next) {
	Appeal.findById(req.params.id, function(err, appeal) {
		if (err) {console.log(err)};
		res.send(appeal);
	});
});


module.exports = router;
