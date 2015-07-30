var express = require('express');
var passport = require('passport');
var router = express.Router();

var Announcement = require('../../models/announcements');

router.get('/', function(req, res, next) {
	Announcement.find({}, function(err, announcements) {
		if (err) {
      res.sendStatus(500);
		} else {
      res.json(announcements);
    }
	});
});

router.post('/', passport.authenticate('google-token'), function(req, res, next) {
  var newAnnouncement = new Announcement({
    title : req.body.title,
    body : req.body.body,
    created : Date.now(),
		updated_at: Date.now(),
    author : req.user._id
  });

  newAnnouncement.save(function(err, createdAnnouncement) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(createdAnnouncement);
    }
  });
});

module.exports = router;
