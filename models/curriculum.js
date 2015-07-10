var mongoose = require('mongoose');
var relationship = require('mongoose-relationship');

//Models with relationships
var Assignment = require('./assignments.js');
var Unit = require('./units.js');


//Schema Definition
var curriculumSchema = mongoose.Schema({
    subject: String,
    overview: String,
    dependencies : [{type: mongoose.Schema.ObjectId, ref: "Curriculum", childPath: "dependencyOf"}],
    resources : [{type: mongoose.Schema.ObjectId, ref: "Resource", childPath: "units"}],
    assignments: [{ type:mongoose.Schema.ObjectId, ref:"Assignment", childPath:"subjects" }],
    dependencyOf: [{type: mongoose.Schema.ObjectId, ref: "Curriculum", childPath: "dependencies"}],
    units: [{type: mongoose.Schema.ObjectId, ref: "Unit", childPath: "subject"}],
    published: Boolean,
    gif: String
});

curriculumSchema.plugin(relationship, { relationshipPathName:'assignments' });
curriculumSchema.plugin(relationship, { relationshipPathName:'units' });
curriculumSchema.plugin(relationship, { relationshipPathName:'dependencies' });
curriculumSchema.plugin(relationship, { relationshipPathName:'dependencyOf' });

// on every save, add the date
curriculumSchema.pre('save', function(next) {
  console.log(this);
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