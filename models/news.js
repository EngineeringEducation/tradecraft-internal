var news = {
	getNews : function (db, done, id) {
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
	},

	newNews : function (db, title, body, done) {
		db.query("INSERT INTO news (title, body) VALUES ($1, $2);", [title, body], function(err, results) {
			if (err) {
				console.log(err);
				done(err, null);
			}
			done(null, results);
		});
	}
};

module.exports = news;