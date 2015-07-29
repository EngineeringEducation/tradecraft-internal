
var express = require('express');
var router = express.Router();

var Announcements = require("../models/announcements");

router.get('/', function(req, res, next) {
	Announcements.find({}, function(err, announcements) {
		if (!err) {
			req.data = {
				announcements: announcements
			};
			if (!req.accepts("application/html")) {
				res.send(announcements);
			} else {
				res.render("announcements/all.html", req);
			}
		}
	});
});

router.get('/new', function(req, res, next) {
	res.render("announcements/new.html", req);
});

router.post('/', function(req, res, next) {
	if (req.body.title && req.body.body) {
		var announcement = new Announcements({
			title : req.body.title,
			body : req.body.body,
			created : Date.now(),
			author : req.user._id
		});

		announcement.save(function(err, announcement) {
			if (err) {console.log(err);}
			res.redirect("/announcements");
		});
	}
});

//Has to come after /new or it will match /new and try to interpret it as an ID
router.get('/:id', function(req, res, next) {
	Announcements.findById(req.params.id, function(err, announcements) {
		if (err) {console.log(err);}
		req.data = {
			announcements : announcements
		};
		res.render("announcements/all.html", req);
	});
});

module.exports = router;
