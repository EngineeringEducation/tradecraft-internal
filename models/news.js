var mongoose = require('mongoose');

//Related Models


var newsSchema = mongoose.Schema({
	title : String,
	body : String,
	created : Date,
	updated_at : Date,
	author : { type:mongoose.Schema.ObjectId, ref:"User", childPath:"newsPosts" }
});


// on every save, add the date
newsSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
	if (!this.created_at) {
		this.created_at = currentDate;
	}
    

  next();
});

//Model Definition
var News = mongoose.model('News', newsSchema);

module.exports = News;

// var news = {
// 	getNews : function (db, done, id) {
// 		// This function is a bit damp.
// 		if (id){
// 			db.query("SELECT title, body, created, id FROM news WHERE id = $1;",[id], function(err, results) {
// 				if (err) {
// 					console.log(err);
// 					done(err, null);
// 				} else{
// 					done(null, results.rows);
// 				}
// 			});
// 		} else {
// 			db.query("SELECT title, body, created, id FROM news ORDER BY created desc;", function(err, results) {
// 				if (err) {
// 					console.log(err);
// 					done(err, null);
// 				} else{
// 					done(null, results.rows);
// 				}
// 			});
// 		}
// 	},

// 	newNews : function (db, title, body, done) {
// 		db.query("INSERT INTO news (title, body) VALUES ($1, $2);", [title, body], function(err, results) {
// 			if (err) {
// 				console.log(err);
// 				done(err, null);
// 			}
// 			done(null, results);
// 		});
// 	}
// };

// module.exports = news;