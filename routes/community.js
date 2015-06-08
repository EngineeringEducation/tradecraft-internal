var express = require('express');
var router = express.Router();
var Community = require('../models/community');
//initialize
var community = new Community();

/* GET home page. */
// I typed the word "news" too many times for this and now it looks weird.
router.get('/', function(req, res, next) {
	community.getCommunityPage(req.db, req.user, (req.query.page || 1), function(errList, data) {
		res.render('community/news', data);
	});
});

router.get('/submit', function(req, res, next) {
	res.render("community/submit");
});

router.post('/submit', function(req, res, next) {
	console.log("Just got a form sent to submit- ", req.body);

	if (req.body.self) {
		var author = req.user.name;
	} else {
		var author = req.body.author;
	}
	community.saveNewSubmission(req.db, req.user, author, req.body.self, req.body.title, req.body.description, req.body.link, req.body.tweet_data, req.body.fb_data, function(err, results){
		console.log("err", err);
		console.log("results", results);
		res.redirect("/community");
	});
});

//Has to come after /new or it will match /new and try to interpret it as an ID
router.get('/:id', function(req, res, next) {
	community.getSubmission(req.db, req.user, req.params.id, function(err, submission) {
		res.render('community/discussion', submission);
	});
});


//This route is just accessed by AJAX.
router.post('/:id/vote', function(req, res, next) {

	if (req.body.vote){
		community.recordVote(req.db, req.params.id, req.user, req.body.vote, function(err, upvotes) {
			console.log("Are we coming back from the model");
			if (!err) {
				console.log("Community vote recorded");
				res.send({"status" : true, "votes" : upvotes});
			}
		});
	} else {
		res.send("Vote failed due to no vote being sent");
	}
});

router.post('/:id/comment', function(req, res, next) {
	console.log(req.body);
	community.saveComment(req.db, req.params.id, req.user, req.body.title, req.body.body, function(err) {
		if (err) {console.log(err)};
		res.redirect("/community/"+req.params.id);
	});
});

module.exports = router;
