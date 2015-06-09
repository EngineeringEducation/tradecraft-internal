var express = require('express');
var router = express.Router();

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
		newNews(req.db, req.body.title, req.body.body, function(err, results) {
			if (!err) {
				console.log("News created")
				res.redirect("/news");
			}
		});
	}
});

//Has to come after /new or it will match /new and try to interpret it as an ID
router.get('/:id', function(req, res, next) {
	getNews(req.db, function(err, news) {
		if (!err) {
			res.render("news/all_news.html", { "news": news });
		}
		
	}, req.params.id)
});



/// Not bothering with a whole complex model with News, probably have to throw together some analytics eventually
//. but it's just not really worth it for now.
function getNews (db, done, id) {
	// This function is a bit damp.
	if (id){
		db.query("SELECT title, body, created, id FROM news WHERE id = $1;",[id], function(err, results) {
			if (err) {
				console.log(err);
				done(err, null);
			} else{
				done(null, results.rows);
			}
		});
	} else {
		db.query("SELECT title, body, created, id FROM news ORDER BY created desc;", function(err, results) {
			if (err) {
				console.log(err);
				done(err, null);
			} else{
				done(null, results.rows);
			}
		});
	}
}

function newNews (db, title, body, done) {
	db.query("INSERT INTO news (title, body) VALUES ($1, $2);", [title, body], function(err, results) {
		if (err) {
			console.log(err);
			done(err, null);
		}
		done(null, results);
	});
}

module.exports = router;
//let's just reuse this code
module.exports.getNews = getNews;
module.exports.newNews = newNews;