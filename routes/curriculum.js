var express = require('express');
var router = express.Router();
var _ = require('underscore')

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
		dependencies : req.body.dependencies, //make sure this is an array
		dependencyOf : req.body.dependencyOf,
		assignments : req.body.assignments, //this too
		published: true, // hard coded for now
		gif: req.body.gif
	});

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

	console.log(curriculum);
	curriculum.save(function(err) {
		//If there is a mongodb error, also rerender and send values back down.
		if (err) throw err;
		console.log("Saved Curriculum");
		console.log(curriculum)
		res.redirect("/curriculum/"+ curriculum._id)
	});

});


router.get('/:id', function(req, res, next) {
	console.log(req.user.isInstructor())
	Curriculum.findById(req.params.id).populate("dependencies").populate("dependencyOf").exec(function(err, thisCurriculum) {
		if (err) throw err;
		Curriculum.find({}).exec(function(err, curriculum) {
			//Are we editing, or are we just viewing?
			if (err) throw err;
			if (req.query["edit"]) {
				res.render("curriculum/edit.html", { "user" : req.user, "thisCurriculum": thisCurriculum, "curriculum": curriculum});
			} else {
				res.render("curriculum/show.html", { "user" : req.user, "thisCurriculum": thisCurriculum, "curriculum": curriculum});
			}
		});
	});
});

/* 
THIS IS AN EDIT FUNCTION ONLY, NOT FOR NEW 
To conform to good REST principles tho this should be a PUT. 
Should probably make the form be AJAX so we can have a coherent REST API. #TODO
*/
router.post('/:id', function(req, res, next) {
	console.log("Got to the submit");
	console.log(req.body)

	var curriculum = {
		subject : req.body.subject,
		overview : req.body.overview,
		dependencies : _.compact(req.body.dependencies),
		dependencyOf : _.compact(req.body.dependencyOf),
		assignments : _.compact(req.body.assignments),
		published: true, // hard coded for now
		gif: req.body.gif
	};

	//Get the examples - we might have deleted one in the middle.
	var exampleCount = Number(req.body.highestExampleCount || 1);
	console.log("num examples ", typeof exampleCount);
	var submittedExamples = [];
	for (var i=1; i<=exampleCount; i++) {
		console.log(i, req.body["example_" + i], req.body["example-text_" + i]);
		if (req.body["example_" + i] && req.body["example-text_" + i]) {
			submittedExamples.push({
				link : req.body["example_" + i],
				linkText : req.body["example-text_" + i]
			});
		}
		
	}

	curriculum.examples = _.compact(submittedExamples);
	
	//Get the resources - we might have deleted one in the middle.
	var resourceCount = Number(req.body.highestResourceCount || 1);
	console.log("num resources ", typeof resourceCount);
	var submittedResources = [];
	for (var i=1; i<=resourceCount; i++) {
		console.log(i, req.body["resource_" + i], req.body["resource-text_" + i])
		if (req.body["resource_" + i] && req.body["resource-text_" + i]){
			submittedResources.push({
				link : req.body["resource_" + i],
				linkText : req.body["resource-text_" + i]
			});
		}
	}

	curriculum.resources = _.compact(submittedResources);
	console.log(curriculum)

	Curriculum.findByIdAndUpdate(req.params.id, curriculum, function(err) {
		res.redirect("/curriculum/" + req.params.id);
	});
});

module.exports = router;