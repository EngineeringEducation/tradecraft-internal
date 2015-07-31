var express = require('express');
var router = express.Router();
var _ = require('underscore');

var Example = require("../models/examples");

router.post("/", function(req, res, next) {
	var example = new Example({
		link: req.body.link,
		linkText: req.body.linkText
	});
	example.save(function(err, example) {
		if (err) {console.log(err);}
		res.send(example);
	});
});


router.get('/:id', function(req, res, next) {
	//Edit mode
	Example.findById(req.params.id, function(err, example) {
		if (err) {console.log(err);}
		res.send(example);
	});
});


module.exports = router;
