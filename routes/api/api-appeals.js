var express = require('express');
var router = express.Router();

var Appeal = require('../../models/appeals');

router.get('/', function(req, res, next) {
	Appeal.find({status:'NEW'})
	.populate("author")
	.exec(function(err, appeals) {
		if (err) {
			res.sendStatus(500);
		} else {
			res.json(appeals);
		}
	});
});

router.post('/', function(req, res, next) {
	var newAppeal = new Appeal({
		author:req.user._id,
		status:'NEW'
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
