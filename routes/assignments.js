var express = require("express");
var moment = require("moment");
var router = express.Router();

var Assignment = require("../models/assignments");
var User = require("../models/user");



router.get("/", function(req, res) {

	Assignment.find({}, function(err, assignments) {
		req.data = {
			assignments : assignments
		};
		res.render("assignments/all.html", req);
	});
});

/* GET new assignment maker */
router.get("/new", function(req, res) {
	res.render("assignments/new.html", {user: req.user});
});

router.post("/new", function(req, res) {
	console.log("NEW ASSIGNMENT:", req.body);
	var assignment = null; // To be filled by (most) switch paths
	switch (req.body.type) {
		case 'link':
			assignment = new Assignment({
				title : req.body.title,
				type: "link",
				link : {
					link : req.body.assignment_link,
					description : req.body.link_description[0]
				}
			});

			break;
		case 'reading':
			assignment = new Assignment({
				title : req.body.title,
				type: "reading",
				reading : {
			      link : req.body.reading_url,
			      url_type : req.body.url_type,
			      description : req.body.link_description[1]
			    }
			});
			break;
		case 'walkthrough':
			assignment = new Assignment({
				title : req.body.title,
				type : "walkthrough",
				walkthrough : {
			    	preReading: req.body.walkthrough_prereading,
			    	walkthrough : req.body.walkthrough_text
			    }
			});
			break;
		case 'research':
			assignment = new Assignment({
				title : req.body.title,
				type : "research",
				research : {
					topic : req.body.research_prompt,
					task : req.body.research_goal,
					deliver_type : req.body.deliver_type,
					give_type : req.body.give_type,
					use: req.body.use,
					google : req.body.google_keywords,
					interviews : req.body.interviews,
					forms : req.body.forms,
					books : req.body.books,
					articles : req.body.articles
				}
			});
			break;
		case undefined:
			res.redirect("/assignments/new", {user: req.user});
			break;
	}
	if (assignment) {
		assignment.save(function(err, assignment) {
			if (err) {console.log(err);}
			done(assignment);
		});
	}

	function done (assignment) {
		res.redirect("/assignments/" + assignment._id);
	}
});

/* GET new assignment maker */
router.get("/:id", function(req, res) {
	Assignment.findById(req.params.id, function(err, assignment) {
		if (err) {console.log(err);}
		res.render("assignments/show.html", {user: req.user, assignment: assignment});
	});

});



module.exports = router;
