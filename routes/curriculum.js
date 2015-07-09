var express = require('express');
var router = express.Router();
var _ = require('underscore')

var Curriculum = require('../models/curriculum');
var Assignment = require('../models/assignments');
var Units = require('../models/units');

/* GET curriculum page. */
router.get('/', function(req, res, next) {
  res.render("curriculum.html", req);
});

router.get('/all', function(req, res, next) {
	Curriculum.find({}, function(err, curriculum) {
		res.render("curriculum/all_curriculum.html", { user : req.user, curriculum: curriculum });
	});
});

router.get("/new", function(req, res, next) {
	Curriculum.find({published: true}).exec(function(err, curriculum) {
		Assignment.find({}).exec(function(err, assignments) {
			res.render("curriculum/new.html", { user : req.user, curriculum: curriculum, assignments: assignments });
		});
	});
});

/* 
Create a new curriculum
	//#TODO Error Checking
	//If we fail out of error checking, kick them to a page where they can resubmit (so send form values back down)
*/
router.post("/new", function(req, res, next) {

	console.log("Form body: ",req.body);
	//Create the new curriculum to be saved.
	var curriculum = Curriculum({
		subject : req.body.subject,
		overview : req.body.overview,
		dependencies : req.body.dependencies, //make sure this is an array
		dependencyOf : req.body.dependencyOf,
		assignments : req.body.assignments, //this too
		published: true, // hard coded for now
		gif: req.body.gif
	});

	if (typeof req.body.resource == 'Array') {
		for (var i = 0; i < req.body.resource.length; i++) {
			var resource = {
				link : req.body.resource[i],
				linkText : req.body['resource-text'][i]
			}
			curriculum.resources.push(resource);
		}
	} else {
		var resource = {
			link : req.body.resource || "",
			linkText : req.body['resource-text']|| ""
		};
		curriculum.resources.push(resource);
	}
	
	if (typeof req.body.examples == 'Array') {
		for (var i = 0; i < req.body.example.length; i++) {
			var example = {
				link : req.body.example[i],
				linkText : req.body['example-text'][i]
			}
			curriculum.examples.push(example);
		}
	} else {
		var example = {
			link : req.body.example || "",
			linkText : req.body['example-text'] || ""
		};
		curriculum.examples.push(example);	
	}

	curriculum.save(function(err) {
		//If there is a mongodb error, also rerender and send values back down.
		if (err) {console.log(err);}
		res.redirect("/curriculum/"+ curriculum._id)
	});

});


router.get('/:id', function(req, res, next) {
	req.data = {};
	if (req.query.publish == "true") {
		Curriculum.findByIdAndUpdate(req.params.id, {published: true});
		res.redirect("/curriculum/" + req.params.id);
	}
	if (req.query.publish == "false") {
		Curriculum.findByIdAndUpdate(req.params.id, {published: false});
		res.redirect("/curriculum/" + req.params.id);
	}
	Curriculum.findById(req.params.id)
	.populate("dependencies")
	.populate("dependencyOf")
	.populate("assignments")
	.populate("units")
	.populate("examples")
	.populate("resources")
	.exec(function(err, curricula) {
	if (err) {console.log(err);}
	req.data.curricula = curricula;
	Curriculum.find({}).exec(function(err, curriculum) {
			if (err) {console.log(err);}
			req.data.curriculum = curriculum;
			Assignment.find({}).exec(function(err, assignments) {
				if (err) {console.log(err);}
				req.data.assignments = assignments;
				if (req.query.edit) {
					res.render("curriculum/edit.html", req);
				} else {
					res.render("curriculum/show.html", req);
				}
			});
		});
	});
});

/* 
Edit existing curriculum
To conform to good REST principles tho this should be a PUT but eh, html forms. What can ya do. 
Probably make this respond to PUT as well.
*/
router.post('/:id', function(req, res, next) {
	console.log(req.body);
	
	var curriculum = {
		subject : req.body.subject,
		overview : req.body.overview,
		dependencies : req.body.dependencies.isArray() ? req.body.dependencies : [req.body.dependencies],
		assignments : req.body.assignments.isArray() ? req.body.assignments : [req.body.assignments], 
		resources : req.body.resources.isArray() ? req.body.resources : [req.body.resources], 
		examples : req.body.examples.isArray() ? req.body.examples : [req.body.examples],
		published: true, // hard coded for now
		gif: req.body.gif
	};

	Curriculum.findByIdAndUpdate(req.params.id, curriculum, function(err) {
		res.redirect("/curriculum/" + req.params.id);
	});
});

module.exports = router;