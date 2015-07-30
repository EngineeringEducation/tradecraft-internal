var express = require('express');
var router = express.Router();

var Announcements = require('../../models/announcements');

router.get('/', function(req, res, next) {
	Announcements.find({}, function(err, announcements) {
		if (err) {
      res.sendStatus(500);
		} else {
      res.json(announcements);
    }
	});
});

router.post('/', function(req, res, next) {
  var newAnnouncement = new Announcements({
    title : req.body.title,
    body : req.body.body,
    created : Date.now(),
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
