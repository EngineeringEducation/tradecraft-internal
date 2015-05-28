//imports
var _ = require("underscore");
var moment = require('moment');

var student = function student (config) {
	_.extend(this, config);
	if (!this.db) {
		console.log("Oh, gotta get a DB on that sucker");
	}
	console.log("New Student Initialized");
	
}

student.prototype.getToday = function() {

	var params = {
		assignments : [
			{
				title : "Webapp Layout",
				due_date : moment(moment(new Date()).add(2, "days")).fromNow()
			},
			{
				title : "Eloquent JS",
				due_date : moment(moment(new Date()).add(3, "days")).fromNow(),
				notes : "Chapters 2-4 \n"
			}
		],
		assignments_materials : [
			{
				link : "http://www.teaching-materials.org/htmlcss-1day/",
				title : "Teaching-Materials HTML/CSS"
			},
			{
				link : "https://www.khanacademy.org/computing/computer-programming/html-css",
				title : "Khan Academy's HTML/CSS Course by Pamela Fox"
			},
			{
				link : "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference",
				title : "Mozilla Reference"
			}
		],
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
		news : [
			{
				title : "Downstairs Front Bathroom is not working",
				id : "1"
			},
			{
				title : "Still need volunteers for tradeconf",
				id : "2"
			},
			{
				title : "An Announcement from Russ",
				id : "3"
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
	return params;
}
//functions

/////// For now, we're going to do this functional-style. Maybe we'll turn this into something cleaner later.







//exports
var exports
exports.student = student;