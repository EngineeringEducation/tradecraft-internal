// models/appeals.js
// an appeal is a cry for help from a student because sadness. go help them

var mongoose = require('mongoose');
var relationship = require('mongoose-relationship');

//Schema Definition
var appealSchema = mongoose.Schema({
    author:{type:mongoose.Schema.ObjectId, ref:"User", childPath:"appeals"},
    status:String
});

appealSchema.plugin(relationship, {relationshipPathName:'author'});

// on every save, add the date
appealSchema.pre('save', function(next) {
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
var Appeal = mongoose.model('Appeal', appealSchema);

module.exports = Appeal;
