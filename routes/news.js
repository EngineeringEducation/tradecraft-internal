var express = require('express');
var router = express.Router();


var News = require("../models/news");

/* GET home page. */
// I typed the word "news" too many times for this and now it looks weird.
router.get('/', function(req, res, next) {
	News.find({}, function(err, news) {
		if (!err) {
			req.data = {
				news: news
			};
			res.render("news/all_news.html", req);
		}
	});
});

router.get('/new', function(req, res, next) {
	res.render("news/new_news.html");
});

router.post('/new', function(req, res, next) {
	if (req.body.title && req.body.body) {
		var news = new News({
			title : req.body.title,
			body : req.body.body,
			created : Date.now(),
			author : req.user._id
		});

		news.save(function(err) {
			if (err) {console.log(err);}
			res.redirect("/news");
		});
	}
});

//Has to come after /new or it will match /new and try to interpret it as an ID
router.get('/:id', function(req, res, next) {
	News.findById(req.params.id, function(err, news) {
		if (err) {console.log(err);}
		req.data = {
			news : news
		};
		res.render("news/all_news.html", req);
	});
});

module.exports = router;