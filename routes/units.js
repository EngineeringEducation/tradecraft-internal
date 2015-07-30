var express = require('express');
var router = express.Router();
var _ = require('underscore');

var Curriculum = require('../models/curriculum');
var Unit = require('../models/units');
var Assignment = require('../models/assignments');

router.get('/', function(req, res, next) {
	if (req.accepts(['json', 'text'])) {
		Unit.find({}, function(err, units) {
			res.send(units);
		});
	} else {
  		res.render("unit.html", req);
	}
});

router.get('/all', function(req, res, next) {
	Unit.find({}, function(err, units) {
		req.data = {
			units: units
		};
		res.render("curriculum/units/all_units.html", req);
	});
});

router.get("/new", function(req, res, next) {
	req.data = {};
	Curriculum.find().exec(function(err, curriculum) {
		req.data.curriculum = curriculum;
		Assignment.find({}).exec(function(err, assignments) {
			req.data.assignments = assignments;
			Unit.find({}).exec(function(err, units) {
				req.data.units = units;
				res.render("curriculum/units/new.html", req);
			});
		});
	});
});

/* 
Create a new unit
	//#TODO Error Checking
	//If we fail out of error checking, kick them to a page where they can resubmit (so send form values back down)
*/
router.post("/", function(req, res, next) {

	//Make sure these are arrays and don't make empty arrays
	if (req.body.examples && !req.body.examples.push) {
		req.body.examples = [req.body.examples];
	}

	if (req.body.resources && !req.body.resources.push) {
		req.body.resources = [req.body.resources];
	}

	if (req.body.dependencies && !req.body.dependencies.push) {
		req.body.dependencies = [req.body.dependencies];
	}

	if (req.body.dependencyOf && !req.body.dependencyOf.push) {
		req.body.dependencyOf = [req.body.dependencyOf];
	}

	if (req.body.related && !req.body.related.push) {
		req.body.related = [req.body.related];
	}

	if (req.body.assignments && !req.body.assignments.push) {
		req.body.assignments = [req.body.assignments];
	}

	//Create the new curriculum to be saved.
	var unit = Unit({
		subject : req.body.subject,
		name : req.body.name,
		overview : req.body.overview,
		dependencies : req.body.dependencies,
		assignments : req.body.assignments, 
		resources : req.body.resources, 
		related : req.body.related, 
		examples : req.body.examples, 
		published: true, // hard coded for now
		gif: req.body.gif
	});

	unit.save(function(err) {
		//If there is a mongodb error, also rerender and send values back down.
		if (err) {console.log(err)};
		if (req.accepts("html")) {
			res.redirect("/units/"+ unit._id);
		} else {
			res.send(unit);
		}
	});

});


router.get('/:id', function(req, res, next) {
	req.data = {};
	if (req.query.publish == "true") {
		Unit.findByIdAndUpdate(req.params.id, {published: true});
		res.redirect("/units/" + req.params.id);
	}
	if (req.query.publish == "false") {
		Unit.findByIdAndUpdate(req.params.id, {published: false});
		res.redirect("/units/" + req.params.id);
	}
	Unit.findById(req.params.id)
	.populate("subject")
	.populate("assignments")
	.populate("dependencies")
	.populate("dependencyOf")
	.populate("related")
	.populate("examples")
	.populate("resources")
	.exec(function(err, unit) {
		if (err) {throw err;}
		req.data.unit = unit;
		Unit.find({}).exec(function(err, units) {
				if (err) {throw err;}
				req.data.units = units;

				Assignment.find({}).exec(function(err, assignments) {
					if (err) {console.log(err);}
					req.data.assignments = assignments;
					Curriculum.find({}).exec(function(err, curriculum) {
						if (err) {console.log(err);}
						req.data.curriculum = curriculum;
						if (req.query.edit) {
							res.render("curriculum/units/edit.html", req);
						} else {
							res.render("curriculum/units/show.html", req);
						}
					});
				});
			});
		});
	});

/* 
Edit existing unit
To conform to good REST principles tho this should be a PUT only but eh, html forms. What can ya do. 
*/
router.post('/:id', saveExistingUnit);
router.put('/:id', saveExistingUnit);

function saveExistingUnit(req, res, next) {
	console.log(req.body);

	var unit = {
		subject : req.body.subject,
		name : req.body.name,
		overview : req.body.overview,
		dependencies : req.body.dependencies,
		assignments : req.body.assignments, 
		resources : req.body.resources, 
		related : req.body.related, 
		examples : req.body.examples, 
		published: true, // hard coded for now
		gif: req.body.gif
	};

	Unit.findByIdAndUpdate(req.params.id, unit, function(err) {
		res.redirect("/units/" + req.params.id);
	});
};

module.exports = router;