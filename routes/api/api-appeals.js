var express = require('express');
var passport = require('passport');
var router = express.Router();

var Appeal = require('../../models/appeals');

router.get('/', function(req, res, next) {
	Appeal.find({status:'OPEN'})
	.populate("author")
	.exec(function(err, appeals) {
		if (err) {
			res.sendStatus(500);
		} else {
			res.json(appeals);
		}
	});
});

router.post('/', passport.authenticate('google-token'), function(req, res, next) {
	var newAppeal = new Appeal({
		author:req.user._id,
		need:req.body.need,
		track:req.body.track,
		status:'OPEN'
	});
	newAppeal.save(function(err, createdAppeal) {
		if (err) {
			res.sendStatus(500);
		} else {
			res.json(createdAppeal);
		}
	});
});

router.get('/:id', function(req, res, next) {
	Appeal.findById(req.params.id, function(err, foundAppeal) {
		if (err) {
			res.sendStatus(500);
		} else {
			res.json(foundAppeal);
		}
	});
});


router.put('/:id', function(req, res, next) {
	Appeal.findOneAndUpdate({_id:req.params.id}, req.body, {new:true}, function(err, updatedAppeal) {
		if (err) {
			res.sendStatus(500);
		} else {
			res.json(updatedAppeal);
		}
	});
});

module.exports = router;
