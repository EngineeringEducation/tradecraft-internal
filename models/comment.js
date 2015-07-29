var mongoose = require('mongoose');
var relationship = require('mongoose-relationship');
//Related Models
var Community = require("./community");



//Schema Definition
var commentSchema = mongoose.Schema({
	submitter : { type:mongoose.Schema.ObjectId, ref:"User", childPath:"communityComments" },
	comment : String,
	title: String,
	post: { type:mongoose.Schema.ObjectId, ref:"Community", childPath:"comments" }
});


// on every save, add the date
commentSchema.pre('save', function(next) {
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
var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
