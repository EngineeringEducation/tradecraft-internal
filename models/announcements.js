
var mongoose = require('mongoose');

//Related Models


var announcementSchema = mongoose.Schema({
	title : String,
	body : String,
	created : Date,
	updated_at : Date,
	author : { type:mongoose.Schema.ObjectId, ref:"User", childPath:"announcements" }
});


// on every save, add the date
announcementSchema.pre('save', function(next) {
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
var Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;