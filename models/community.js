var mongoose = require('mongoose');
var relationship = require('mongoose-relationship');
//Related Models
var Comment = require("./comment");


//Schema Definition
var communitySchema = mongoose.Schema({
	submitter : { type:mongoose.Schema.ObjectId, ref:"User", childPath:"communityPosts" },
	author : String,
	title : String,
	submitterIsAuthor : Boolean,
	description : String,
	link : String,
	fb : { text : String },
	twitter : {
		tweet : String,
		tweet_link : String
	},
	votes : [{
		user : { type:mongoose.Schema.ObjectId, ref:"User", childPath:"communityVotes" },
		vote : Boolean
	}],
	upvotes : Number,
	downvotes : Number,
	comments : [{ type:mongoose.Schema.ObjectId, ref:"Comment", childPath:"post" }]
});


// on every save, add the date
communitySchema.pre('save', function(next) {
	// get the current date
	var currentDate = new Date();

	// change the updated_at field to current date
	this.updated_at = currentDate;

	// if created_at doesn't exist, add to that field
	if (!this.created_at) {
		this.created_at = currentDate;
	}

    //Aggregate the upvotes and downvotes for easy ordering (I think there is a better way to do this but w/e)
    var upvotes = 0, downvotes = 0;
    for (var i = 0; i < this.votes.length; i++) {
		if (this.votes[i].vote) {
			upvotes++;
		} else {
			downvotes++;
		}
	}

    this.upvotes = upvotes;
    this.downvotes = downvotes;

	next();
});

//Model Definition
var Community = mongoose.model('Community', communitySchema);

module.exports = Community;