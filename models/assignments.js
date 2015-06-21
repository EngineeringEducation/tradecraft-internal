var mongoose = require('mongoose');
var relationship = require('mongoose-relationship');
//Related Models
var Curriculum = require('./curriculum.js');


//Schema Definition
var assignmentSchema = mongoose.Schema({
    title: String,
    type: String,
    walkthrough : {
      preReading: String,
      walkthrough : String
    },
    link : {
      link : String,
      description : String
    },
    reading : {
      link : String,
      url_type : String,
      description : String
    },
    research : {
      topic : String,
      task : String,
      use : Array,
      deliver_type : String,
      give_type : String,
      google : String,
      interviews : String,
      forms : String,
      books : String,
      articles : String
    },
    dependancies : Array,
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