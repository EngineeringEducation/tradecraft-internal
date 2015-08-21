// models/appeals.js
// An appeal describes a student's need which they hope to get help with.
// It's addressed to a particular track, starts as an open request, and is eventually addressed or retracted.

var mongoose = require('mongoose');
var relationship = require('mongoose-relationship');

//Schema Definition
var appealSchema = mongoose.Schema({
    author:{type:mongoose.Schema.ObjectId, ref:"User", childPath:"appeals", required:true},
    need:{type:String, required:true}, // User-entered text explaining their problem
    track:{type:String, required:true, enum:['SALES', 'DESIGN', 'GROWTH', 'ENGINEERING']}, // Target track
    status:{type:String, required:true, enum:['OPEN', 'ADDRESSED', 'RETRACTED']} // OPEN <-> ADDRESSED|RETRACTED
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
