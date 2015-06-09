var express = require('express');
var router = express.Router();

/* GET curriculum page. */
router.get('/', function(req, res, next) {
  res.render('curriculum', { user : req.user });
});

module.exports = router;