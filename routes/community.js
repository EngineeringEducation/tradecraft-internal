var express = require("express");
var router = express.Router();
var _ = require('underscore');

//Related Models
var Community = require("../models/community");
var Comment = require("../models/comment");


/* GET home page. */
router.get('/', function(req, res, next) {
	var queryCount = 3;
	var completedQueryCount = 0;
	var data = {user: req.user};

	//Get the ones where the author is a user
	Community.find({submitterIsAuthor: true}).sort({ upvotes : 1 }).exec(function(err, topPublishers) {
		if (err) {throw err;}
		completedQueryCount++;
		data.topPublishers = topPublishers;
		done(data);
	});

	//Get the ones where the author isn't a user, just sharing for funsies
	Community.find({submitterIsAuthor: false}).sort({ upvotes : 1 }).exec(function(err, topSubmissions) {
		if (err) {throw err;}
		completedQueryCount++;
		data.topSubmissions = topSubmissions;
		done(data);
	});

	//Find the newest shit
	Community.find({}).sort({created_at: -1 }).exec(function(err, newestSubmissions) {
		if (err) {throw err;}
		completedQueryCount++;
		data.newestSubmissions = newestSubmissions;
		done(data);
	});


	function done (data) {
		if (queryCount === completedQueryCount) {
			res.render("community/news.html", data);
		}
	}
});

router.get("/submit", function(req, res, next) {
	res.render("community/submit.html");
});

router.post("/submit", function(req, res, next) {
	console.log("Just got a form sent to submit- ", req.body);
	var author = "";
	if (req.body.self) {
		author = req.user.displayName;
	} else {
		author = req.body.author;
	}
	var tweet = "";
	if (req.body.tweet_type === "link") {
		tweet = {
			tweet_link : req.body.tweet_data
		};
	} else {
		tweet = {
			tweet : req.body.tweet_data
		};
	}	

	var submission = new Community({
		submitter: req.user._id,
		author: author,
		title: req.body.title,
		submitterIsAuthor: req.body.self,
		description: req.body.description,
		link: req.body.link,
		fb: {
			text: req.body.fb_data
		},
		tweet : tweet,
		votes :[{user: req.user._id, vote: true}],
		upvotes : 1,
		downvotes : 0
	});

	submission.save(function (err, submission) {
		console.log("err ", err);
		console.log("submission ", submission);
		res.redirect("/community");
	});

});

//Has to come after /new or it will match /new and try to interpret it as an ID
router.get("/:id", function(req, res, next) {
	Community.findById(req.params.id).populate("comments").populate("submitter").exec(function(err, submission) {
		req.data = submission;
		//iterator, done, finish
		for (var i=0, d=0, f=submission.comments.length; i < submission.comments.length; i++) {
			submission.comments[i].populate("submitter", function(err, c) {
				d++;
				console.log(d, " ", f);
				if (d === f) {
					res.render("community/discussion.html", req);
				}
			});
		}
		if (submission.comments.length < 1) {
			res.render("community/discussion.html", req);
		}
	});
});


//This route is just accessed by AJAX.
router.post("/:id/vote", function(req, res, next) {
	Community.findById(req.params.id).exec(function(err, submission) {

		submission.votes.push({user: req.user._id, vote: req.body.vote});
		submission.save(function(err, submission) {
			if (err) {console.log(err);}
			console.log("Community vote recorded");
			res.send({"status" : true, "votes" : submission.upvotes});
		});
	});
});

router.post("/:id/comment", function(req, res, next) {
	var comment = new Comment({
		submitter: req.user,
		comment: req.body.body,
		title: req.body.title,
		post: req.params.id
	});
	Community.findById(req.params.id).exec(function(err, submission) {
		submission.comments.push(comment);
		comment.save(function(err, comment) {
			submission.save(function(err, comment) {
				res.redirect("/community/"+req.params.id);
			});
		});
	});
});

module.exports = router;
