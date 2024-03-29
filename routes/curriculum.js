var express = require('express');
var router = express.Router();
var _ = require('underscore');

var Curriculum = require('../models/curriculum');
var Assignment = require('../models/assignments');
var Units = require('../models/units');

/* GET curriculum page. */
router.get('/', function(req, res, next) {
  res.render("curriculum.html", req);
});

router.get('/all', function(req, res, next) {
	req.data = {};
	Curriculum.find({}).populate('units').exec(function(err, curriculum) {
		req.data.curriculum = curriculum;
		res.render("curriculum/all_curriculum.html", req);
	});
});

router.get("/new", function(req, res, next) {
	req.data = {};
	Curriculum.find({published: true}).exec(function(err, curriculum) {
		if (err) {console.log(err);}
		req.data.curriculum = curriculum;
		Assignment.find({}).exec(function(err, assignments) {
			if (err) {console.log(err);}
			req.data.assignments = assignments;
			Units.find({}).exec(function (err, units) {
				req.data.units = units;
				res.render("curriculum/new.html", req);
			});
		});
	});
});

router.get("/scheduler", function(req, res, next) {
  Curriculum.find({published: true})
  .populate("units")
  .populate("units.assignments")
  .populate("units.dependencies")
  .populate("units.examples")
  .populate("units.resources")
  .exec(function(err, curriculum) {
    // TODO: Proper error handling
    if (err) {console.log(err);}
    console.log(curriculum);
    res.render("curriculum/scheduler.html", {user:req.user, curriculum:curriculum});
  });
});

/*
Create a new curriculum
	//#TODO
	//Error Checking
	//REST this up
*/
router.post("/", function(req, res, next) {

	console.log(req.body);

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

	console.log(req.body);

	//Create the new curriculum to be saved.
	var curriculum = Curriculum({
		track : req.body.track,
		subject : req.body.subject,
		overview : req.body.overview,
		dependencies : req.body.dependencies,
		dependencyOf : req.body.dependencyOf,
		assignments : req.body.assignments,
		resources : req.body.resources,
		examples : req.body.examples,
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
	if (req.query.publish === "true") {
		Curriculum.findByIdAndUpdate(req.params.id, {published: true});
		res.redirect("/curriculum/" + req.params.id);
	}
	if (req.query.publish === "false") {
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
	console.log(curricula);
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

	if (req.body.related && !req.body.related.push) {
		req.body.related = [req.body.related];
	}

	if (req.body.related && !req.body.related.push) {
		req.body.related = [req.body.related];
	}

	if (req.body.assignments && !req.body.assignments.push) {
		req.body.assignments = [req.body.assignments];
	}

	var curriculum = {
		subject : req.body.subject,
		overview : req.body.overview,
		dependencies : req.body.dependencies,
		related : req.body.related,
		assignments : req.body.assignments, 
		resources : req.body.resources, 
		examples : req.body.examples, 
		units : req.body.units, 
		published: true, // hard coded for now
		gif: req.body.gif
	};
	console.log("THE CURRICULM LOOKS LIKE THIS PRIOR TO UPDATE: ", curriculum);

	Curriculum.findByIdAndUpdate(req.params.id, curriculum, function(err) {
		res.redirect("/curriculum/" + req.params.id);
	});
});

module.exports = router;
