var express = require('express');
var router = express.Router();

/* GET curriculum page. */
router.get('/', function(req, res, next) {
  res.render("curriculum.html", { user : req.user });
});

router.get("/new_subject", function(req, res, next) {
	res.render("curriculum/new_subject.html", { user : req.user });
});

module.exports = router;