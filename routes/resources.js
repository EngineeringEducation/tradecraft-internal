var express = require('express');
var router = express.Router();
var _ = require('underscore');

var Resource = require("../models/resources");

router.post("/", function(req, res, next) {
	var resource = new Resource({
		link: req.body.link,
		linkText: req.body.linkText
	});
	resource.save(function(err, resource) {
		if (err) {console.log(err)};
		res.send(resource);
	});
});


router.get('/:id', function(req, res, next) {
	Resource.findById(req.params.id, function(err, resource) {
		if (err) {console.log(err)};
		res.send(resource);
	});
});


module.exports = router;
