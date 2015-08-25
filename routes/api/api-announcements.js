var express = require('express');
var passport = require('passport');
var router = express.Router();

var Announcement = require('../../models/announcements');

router.get('/', function(req, res, next) {
	Announcement.find({visible:true})
	.populate("author")
	.exec(function(err, announcements) {
		if (err) {
      res.sendStatus(500);
		} else {
      res.json(announcements);
    }
	});
});

router.post('/', passport.authenticate('google-token'), function(req, res, next) {
  var newAnnouncement = new Announcement({
    title:req.body.title,
    body:req.body.body,
    created:Date.now(),
		updated_at:Date.now(),
		visible:true,
    author:req.user._id
  });

  newAnnouncement.save(function(err, createdAnnouncement) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(createdAnnouncement);
    }
  });
});

router.post('/:announcement_id/hide', passport.authenticate('google-token'), function(req, res, next) {
	// TODO: restrict this function to staff and the author?
	Announcement.findOneAndUpdate({_id:req.params.announcement_id}, {visible:false}, {new:true}, function(err, announcement) {
		if (err) {
			res.sendStatus(500);
		} else {
			res.json(announcement);
		}
	});
});

module.exports = router;
