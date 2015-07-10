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
	req.data = {}
	Curriculum.find({published: true}).exec(function(err, curriculum) {
		if (err) {console.log(err)};
		req.data.curriculum = curriculum;
		Assignment.find({}).exec(function(err, assignments) {
			if (err) {console.log(err)};
			req.data.assignments = assignments;
			Units.find({}).exec(function (err, units) {
				req.data.units = units;
				res.render("curriculum/new.html", req);
			})
		});
	});
});

/* 
Create a new curriculum
	//#TODO Error Checking
	//If we fail out of error checking, kick them to a page where they can resubmit (so send form values back down)
*/
router.post("/", function(req, res, next) {

	console.log(req.body);

	req.body.examples = _.toArray(req.body.examples);
	req.body.resources = _.toArray(req.body.resources);
	req.body.assignments = _.toArray(req.body.assignments);
	req.body.units = _.toArray(req.body.units);

	//Create the new curriculum to be saved.
	var curriculum = Curriculum({
		subject : req.body.subject,
		overview : req.body.overview,
		dependencies : req.body.dependencies,
		dependencyOf : req.body.dependencyOf,
		assignments : req.body.assignments, 
		units : req.body.units, 
		published: true, // hard coded for now
		gif: req.body.gif
	});

	curriculum.save(function(err) {
		//If there is a mongodb error, also rerender and send values back down.
		if (err) {console.log(err);}
		res.redirect("/curriculum/"+ curriculum._id);
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