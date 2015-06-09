var express = require('express');
var router = express.Router();
var news = require("../models/news");

/* GET home page. */
// I typed the word "news" too many times for this and now it looks weird.
router.get('/', function(req, res, next) {
	getNews(req.db, function(err, news) {
		if (!err) {
			res.render("news/all_news.html", { "news": news });
		}
		
	})
});

router.get('/new', function(req, res, next) {
	res.render("news/new_news.html");
});

router.post('/new', function(req, res, next) {
	if (req.body.title && req.body.body) {
		news.newNews(req.db, req.body.title, req.body.body, function(err, results) {
			if (!err) {
				console.log("News created")
				res.redirect("/news");
			}
		});
	}
});

//Has to come after /new or it will match /new and try to interpret it as an ID
router.get('/:id', function(req, res, next) {
	news.getNews(req.db, function(err, news) {
		if (!err) {
			res.render("news/all_news.html", { "news": news });
		}
		
	}, req.params.id)
});

module.exports = router;