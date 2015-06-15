var express = require('express');
var router = express.Router();

var Curriculum = require('../models/curriculum');
var Assignment = require('../models/assignments');

/* GET curriculum page. */
router.get('/', function(req, res, next) {
  res.render("curriculum.html", { user : req.user });
});

router.get('/all', function(req, res, next) {
	Curriculum.find({}, function(err, curriculum) {
		res.render("curriculum/all_curriculum.html", { user : req.user, curriculum: curriculum });
	});
});

router.get('/:id', function(req, res, next) {
	Curriculum.findById(req.params.id, function(err, curriculum) {
		//Are we editing, or are we just viewing?
		if (req.query["edit"]) {
			res.render("curriculum/edit.html", { user : req.user, curriculum: curriculum });
		} else {
			res.render("curriculum/show.html", { user : req.user, curriculum: curriculum });
		}
	});

	
	
});

router.get("/new", function(req, res, next) {
	Curriculum.find({published: true}, function(err, curriculum) {
		res.render("curriculum/new_subject.html", { user : req.user, curriculum: curriculum });
	});
});

router.post("/new", function(req, res, next) {
	//#TODO Error Checking
	//If we fail out of error checking, kick them to a page where they can resubmit (so send form values back down)

	console.log(req.body)

	//Create the new curriculum to be saved.
	var curriculum = Curriculum({
		subject : req.body.subject,
		overview : req.body.overview,
		dependencies : [], //make sure this is an array
		assignments : [], //this too
		examples: [],
		resources: [],
		published: true // hard coded for now
	});

	if (req.body.dependencies) {
		//Figure out how to make this association #TODO
		for (var i = 0; i < req.body.dependencies.length; i++) {
			console.log(req.body.dependencies[i]);
		}	
	}
	
	if (req.body.assignments) {
		//Figure out how to make this association #TODO
		for (var i = 0; i < req.body.assignments.length; i++) {
			console.log(req.body.assignments[i]);
		}
	}

	//make a new example link for each one submitted
	var i = 1;
	while (req.body["example_" + i]) {
		var example = {
			link : req.body["example_" + i],
			linkText : req.body["example-text_" + i]
		}
		curriculum.examples.push(example);
		i++;
	};

	//make a new resource link for each one submitted
	var i = 1;
	while (req.body["resource_" + i]) {
		var resource = {
			link : req.body["resource_" + i],
			linkText : req.body["resource-text_" + i]
		}
		curriculum.resources.push(resource);
		i++;
	};

	if (req.body.gif) {
		curriculum.gif = req.body.gif;
	}

	console.log(curriculum);
	curriculum.save(function(err) {
		//If there is a mongodb error, also rerender and send values back down.
		if (err) throw err;
		console.log("Saved Curriculum");
		console.log(curriculum)
		res.redirect("/curriculum/"+ curriculum._id)
	});

});

module.exports = router;