//imports
var _ = require("underscore");
var moment = require('moment');
var news = require('../models/news');
var community = require('../models/community');


var student = function (config) {
	_.extend(this, config);
	if (!this.db) {
		console.log("Oh, gotta get a DB on that sucker.");
	}
	console.log("Student Initialized");
}


//This function is fucking giant. Also it makes student tightly coupled with like everything else.
// We need to move "Today" controllers into their own thing so that it's less hideous and not so tightly coupled.
student.prototype.getToday = function(cb) {
	if (this.db) {
		console.log("connected yay");
		var db = this.db;
	} else {
		console.log("boo no db");	
	}
	if (this.user) {
		console.log("got a user");
		var user = this.user;
	} else {
		console.log("boo no user");	
	}
	var queryCount = 0;
	var params = {
		schedule_blocks : [
		],
		events : [
		],
		feedback : [
		]

	}

	community.getTopSubmissionsWrittenByMembers(db, user, 1, function(err, submissions) {
		if (err) {
			console.log(err);
			return;
		}
		queryCount++;
		params.community = submissions;
		send(params);
	});


	//Get student's assignments
	db.query("SELECT a.title, a.short_notes AS notes, sa.due_date, sa.status FROM assignments a JOIN students_assignments sa ON sa.assignment_id = a.id;", function(err, results) {
		if (err) {
			console.log(err);
			return;
		}
		queryCount++;
		//pretty-fy the dates using moment
		results.rows.forEach(function(assignment) {
			assignment.due_date = moment(assignment.due_date).fromNow()
		});
		params.assignments = results.rows;
		send(params);
	});

	//Get student's assignment materials
	db.query("SELECT am.link, am.description AS title, am.subjects FROM assignments_materials am JOIN students_assignments sa ON sa.assignment_id = am.assignment_id;", function(err, results) {
		if (err) {
			console.log(err);
			return;
		}
		queryCount++;
		//pretty-fy the dates using moment
		results.rows.forEach(function(materials) {
			materials.subjects = materials.subjects.split(',');
		});
		params.assignments_materials = results.rows;
		send(params);
	})

	//Get all the news
	news.getNews(db, function(err, results) {
		if (err) {
			console.log("Error", err);
			return;
		}
		queryCount++;
		params.news = results;
		send(params);
	});

	//Send once all the queries are finished running
	function send (params) {
		if (queryCount == 4) {
			console.log("Got all queries");
			cb(params);
		}
	}
}
module.exports = student;