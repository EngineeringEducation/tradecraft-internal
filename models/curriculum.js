var mongoose = require('mongoose');
var relationship = require('mongoose-relationship');

//Models with relationships
var Assignment = require('./assignments.js');


//Schema Definition
var curriculumSchema = mongoose.Schema({
    subject: String,
    overview: String,
    dependencies : Array, //This might change,
    resources : [{link: String, linkText: String}],
    examples : [{link: String, linkText: String}],
    assignments: [{ type:mongoose.Schema.ObjectId, ref:"Assignment", childPath:"subjects" }], 
    published: Boolean,
    gif: String
});

curriculumSchema.plugin(relationship, { relationshipPathName:'assignments' });

// on every save, add the date
curriculumSchema.pre('save', function(next) {
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
var Curriculum = mongoose.model('Curriculum', curriculumSchema);

module.exports = Curriculum;