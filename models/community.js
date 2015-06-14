
//a fake model for now - turn this into a real model so we can initialize them out of the database and provide a uniform
//interface. I take responsibility for this terrible file, but I want it noted I wrote it under the influence of NyQuil. - Liz
var submission = {
	id : 1,
	submitter_id : 1,
	title: "Something Amazing I Wrote",
	author : "Liz Howard",
	submitterIsAuthor : true,
	votes : 46,
	description : "Yeah I'm really quite philosophical",
	link : "http://google.com/",
	created : Date.now(),
	rank : 4,
	fb: "http://www.facebook.com/",
	twitter: "https://twitter.com/lizthedeveloper/status/555493314388955137",
	upvote : true,
	downvote : false
}

//There's no reason to init here, this is just a collection of shit. Refactor this to make it less stupid.
var community = function() {
	//Init
	console.log("Community Init");
};

//Get the top 10 submissions where the author is a user, paginated
community.prototype.getTopSubmissionsWrittenByMembers = function(db, user, page, cb) {
	db.query("SELECT community_news.id, community_news.created, submitter_id, author, title, submitter_is_author, description, link, fb, twitter, COUNT(vote) AS votes FROM community_news LEFT OUTER JOIN community_news_votes ON community_news.id = community_news_votes.submission_id WHERE vote > 0 AND community_news.submitter_is_author = TRUE GROUP BY community_news.id ORDER BY votes DESC LIMIT 10", function(err, results) {
		if (!err) {
			var topSubmissionsWrittenByMembers = results.rows;
			cb(null, topSubmissionsWrittenByMembers);
		} else {
			cb(err, null);
		}
	});
};

//Get the top 10 submissions where the author is not a user, paginated
community.prototype.getTopSubmissionsWrittenByOthers = function(db, user, page, cb) {
	db.query("SELECT community_news.id, community_news.created, submitter_id, author, title, submitter_is_author, description, link, fb, twitter, COUNT(vote) AS votes FROM community_news LEFT OUTER JOIN community_news_votes ON community_news.id = community_news_votes.submission_id WHERE vote > 0 AND community_news.submitter_is_author = FALSE GROUP BY community_news.id ORDER BY votes DESC LIMIT 10", function(err, results) {
		if (!err) {
			var topSubmissionsWrittenByOthers = results.rows;
			cb(null, topSubmissionsWrittenByOthers);
		} else {
			cb(err, null);
		}
	});
};

//Get the newest submissions, paginated by 10
community.prototype.getNewSubmissions = function(db, user, page, cb) {
	db.query("SELECT community_news.id, community_news.created, submitter_id, author, title, submitter_is_author, description, link, fb, twitter, COUNT(vote) AS votes FROM community_news LEFT OUTER JOIN community_news_votes ON community_news.id = community_news_votes.submission_id WHERE vote > 0 GROUP BY community_news.id ORDER BY id ASC LIMIT 10", function(err, results) {
		if (!err) {
			var newSubmissions = results.rows;
			cb(null, newSubmissions);
		} else {
			cb(err, null);
		}
	});
};

community.prototype.getSubmission = function(db, user, id, cb) {
	db.query("SELECT community_news.id, community_news.created, submitter_id, author, title, submitter_is_author, description, link, fb, twitter, COUNT(vote) AS votes FROM community_news LEFT OUTER JOIN community_news_votes ON community_news.id = community_news_votes.submission_id WHERE vote > 0 AND community_news.id = $1 GROUP BY community_news.id", [id], function(err, results) {
		if (!err) {
			var submission = results.rows[0];
			//Now get comments
			db.query("SELECT users.name, title, comment FROM community_news_comments JOIN users ON user_id = users.id WHERE submission_id = $1", [id], function(err, results) {
				if (err) {
					console.log(err);
				} else {
					submission.comments = results.rows;
				}
				cb(null, submission);
			});
		} else {
			cb(err, null);
		}
	});
};

community.prototype.getCommunityPage = function(db, user, page, cb) {
	var queryCount = 0;
	var communityPage = {};
	var errList = []

	this.getTopSubmissionsWrittenByMembers(db, user, page, function(err, data) {
		communityPage.topMembers = data || [];
		send(err, communityPage);
	});
	this.getTopSubmissionsWrittenByOthers(db, user, page, function(err, data) {
		communityPage.topOthers = data || [];
		send(err, communityPage);
	});
	this.getNewSubmissions(db, user, page, function(err, data) {
		communityPage.newest = data || [];
		send(err, communityPage);
	});

	function send (err, communityPage) {
		queryCount++;
		if (err) {
			console.log("Error: ", err)
			errList.push(err);
		}
		if (queryCount == 3) {
			cb(errList, communityPage);
		}
	}
}



community.prototype.saveNewSubmission = function(db, user, author, submitterIsAuthor, title, description, link, twitter, fb, cb) {
	console.log("boop")
	db.query("INSERT INTO community_news (submitter_id, title, author, submitter_is_author, description, link, fb, twitter)	VALUES ($1, $2, $3, $4, $5, $6, $7, $8);", 
		[user.id, title, author, Boolean(submitterIsAuthor), description, link, fb, twitter], function(err, results) {
			if (!err) {
				// Now get it back out, so we have the ID and the actual created time
				db.query("SELECT id, created, submitter_id, author, title, submitter_is_author, description, link, fb, twitter FROM community_news WHERE submitter_id = $1 ORDER BY id DESC LIMIT 1", [user.id], function(err, results) {
					if (!err) {
						var submission = results.rows[0];
						console.log(user.name + " submitted " + submission.id)
						//Save a vote for the current submitter too
						db.query("INSERT INTO community_news_votes (user_id, submission_id, vote) VALUES ($1, $2, $3)", [user.id, submission.id, 1], function(err, results) {
							if (!err) {
								console.log(user.name + " upvoted " + submission.id);
								submission.upvoted = true;
								submission.downvoted = false;
								cb(null, submission)
							} else {
								cb(err, null);
							}
						}); // end insert vote
					} else {
						cb(err, null);
					}
				}); // end get submission back out
			} else {
				cb(err, null);
			}
	}); //end insert new submission
};

community.prototype.recordVote = function(db, submission_id, user, vote, cb) {
	console.log("Recording a vote...")
	// insert, set BOTH upvote and downvote properties, which are per-user, otherwise handlebars sucks
	// Also inserting as a number because it makes sql easier
	db.query("INSERT INTO community_news_votes (user_id, submission_id, vote) VALUES ($1, $2, $3)", [user.id, submission_id, Number(vote)], function(err, results) {
		if (!err) {
			console.log(user.name + " upvoted " + submission_id);
			db.query("SELECT count(vote) as upvotes FROM community_news_votes WHERE submission_id = $1 AND vote > 0;", [submission_id], function(err, results) {
				if (err) {
					cb(err, null);
					return;
				}
				cb(null, results.rows[0].upvotes)
			});
		} else {
			console.log(err);
			cb(err, null);
		}
	}); // end insert vote
};

community.prototype.saveComment = function(db, submission_id, user, title, body, cb) {
	db.query("INSERT INTO community_news_comments (user_id, submission_id, title, comment) VALUES ($1, $2, $3, $4)", [user.id, submission_id, title, body], function(err, results) {
		if (!err) {
			console.log(user.name + " commented on " + submission_id);
			cb(null);
		} else {
			console.log(err);
			cb(err);
		}
	}); // end insert vote
};

module.exports = community