var mongoose = require('mongoose');
var relationship = require('mongoose-relationship');

//Models with relationships
var Assignment = require('./assignments.js');
var Curriculum = require('./curriculum.js');


//Schema Definition
var unitSchema = mongoose.Schema({
    subject: {type: mongoose.Schema.ObjectId, ref: "Curriculum", childPath: "units"},
    name: String,
    overview: String,
    dependencies : [{type: mongoose.Schema.ObjectId, ref: "Unit", childPath: "dependencyOf"}],
    resources : [{type: mongoose.Schema.ObjectId, ref: "Resource", childPath: "units"}],
    examples : [{type: mongoose.Schema.ObjectId, ref: "Example", childPath: "units"}],
    assignments: [{ type:mongoose.Schema.ObjectId, ref:"Assignment", childPath:"units" }],
    dependencyOf: [{type: mongoose.Schema.ObjectId, ref: "Unit", childPath: "dependencies"}],
    related: [{type: mongoose.Schema.ObjectId, ref: "Unit", childPath: "related"}],
    published: Boolean,
    gif: String,
    points: Number
});

unitSchema.plugin(relationship, { relationshipPathName:'subject' });
unitSchema.plugin(relationship, { relationshipPathName:'assignments' });
unitSchema.plugin(relationship, { relationshipPathName:'dependencies' });
unitSchema.plugin(relationship, { relationshipPathName:'dependencyOf' });
unitSchema.plugin(relationship, { relationshipPathName:'examples' });
unitSchema.plugin(relationship, { relationshipPathName:'resources' });

// on every save, add the date
unitSchema.pre('save', function(next) {
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
var Unit = mongoose.model('Unit', unitSchema);

module.exports = Unit;