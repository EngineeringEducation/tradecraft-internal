var express = require('express');
var router = express.Router();

/* GET curriculum page. */
router.get('/', function(req, res, next) {
  res.render("curriculum.html", { user : req.user });
});

router.get("/new", function(req, res, next) {
	res.render("curriculum/new_subject.html", { user : req.user });
});

router.post("/new", function(req, res, next) {
	var curriculum = {
		topic : req.body.name,
		overview : req.body.summary,
		dependencies : req.body.dependencies + [], //make sure this is an array
		assignments : req.body.assignments + [] //this too
		examples: [],
		resources: []
	};

	//make a new example link for each one submitted
	var i = 0;
	while (req.body["example_" + i]) {
		var example = {
			example : req.body["example_" + i],
			example_text : req.body["example-text_" + i]
		}
		curriculum.examples.push(example);
	};

	//make a new resource link for each one submitted
	var i = 0;
	while (req.body["resource_" + i]) {
		var resource = {
			resource : req.body["resource_" + i],
			resource_text : req.body["resource-text_" + i]
		}
		curriculum.resources.push(resource);
	};

	console.log(curriculum);

	res.render("curriculum/new_subject.html", { user : req.user, curriculum: curriculum });
});

module.exports = router;