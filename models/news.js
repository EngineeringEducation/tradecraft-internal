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
