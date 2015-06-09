//imports
var _ = require("underscore");
var moment = require('moment');
var news = require('../models/news');

var student = function (config) {
	_.extend(this, config);
	if (!this.db) {
		console.log("Oh, gotta get a DB on that sucker");
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
	var queryCount = 0;
	var params = {
		schedule_blocks : [
			{
				time: "9:30-11:30",
				type : "Curriculum",
				title : "HTML/CSS",
				curriculum_id : 1

			},
			{
				time : "11:35-12:00",
				title : "All-Hands",
				curriculum_id : "0"
			},
			{
				time : "1:30-2:30",
				type : "Mentor",
				title : "Biz Stone",
				curriculum_id : "0"
			},
			{
				time : "4:30-6:30",
				type : "Cross-Functional",
				title : "Growth (Personal Branding)",
				curriculum_id : "16"
			}
		],
		events : [
			{
				date : moment(new Date()).add('3', 'days').format('dddd M/D hh:mm'),
				title: "Alumni Mixer",
				type : "Networking",
				label : "success",
			},
			{
				date : moment(new Date()).add('6', 'days').format('dddd M/D hh:mm'),
				title: "Drinks at Grumpy's",
				type : "Fun",
				label : "warning",
			},
			{
				date : moment(new Date()).add('12', 'days').format('dddd M/D hh:mm'),
				title: "Women in Growth / Founder Dating Meetup",
				type : "Networking",
				label : "success",
				href : "http://google.com/"
			}
		],
		community : [
			{
				title: "Why I chose Tradecraft",
				student_name : "Sally Student",
				link : "http://google.com",
				tweet : "https://twitter.com/intent/tweet?url=https%3A%2F%2Ftradecraft.com&via=tradecraft&text=yo%20TC!",
				facebook : "http://facebook.com"
			},
			{
				title: "Killing it in Growth",
				student_name : "Kristy Castinagos",
				link : "http://google.com",
				tweet : "https://twitter.com/intent/tweet?url=https%3A%2F%2Ftradecraft.com&via=tradecraft&text=yo%20TC!",
				facebook : "http://facebook.com"
			},
			{
				title: "Selling to Mid-Size Startups",
				student_name : "Brittany Spears",
				link : "http://google.com",
				tweet : "https://twitter.com/intent/tweet?url=https%3A%2F%2Ftradecraft.com&via=tradecraft&text=yo%20TC!",
				facebook : "http://facebook.com"
			}

		],
		feedback : [
			{
				date : moment(new Date()).subtract(4, 'days').format("M/D"),
				title : "Curriculum",
				id : "4988"
			},
			{
				date : moment(new Date()).subtract(2, 'days').format("M/D"),
				title : "Engineering Teach",
				id : "5064"
			},
			{
				date : moment(new Date()).subtract(1, 'days').format("M/D"),
				title : "Growth Teach",
				id : "6789"
			}
		]

	}



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
		if (queryCount == 3) {
			console.log("Got all queries");
			cb(params);
		}
	}
}
module.exports = student;