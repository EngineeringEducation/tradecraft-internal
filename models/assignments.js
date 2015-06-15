var mongoose = require('mongoose');
var relationship = require('mongoose-relationship');
//Related Models
var Curriculum = require('./curriculum.js');


//Schema Definition
var assignmentSchema = mongoose.Schema({
    subject: String,
    body: String,
    dependancies : Array, //This might change
    subjects: [{ type:mongoose.Schema.ObjectId, ref:"Curriculum", childPath:"assignments" }]

});

//Relationship Schema Definition
assignmentSchema.plugin(relationship, { relationshipPathName:'subjects' });


// on every save, add the date
assignmentSchema.pre('save', function(next) {
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
var Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;