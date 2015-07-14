var mongoose = require('mongoose');
var relationship = require('mongoose-relationship');

//Schema Definition
var exampleSchema = mongoose.Schema({
    link: String,
    linkText: String
});



// on every save, add the date
exampleSchema.pre('save', function(next) {
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
var Example = mongoose.model('Example', exampleSchema);

module.exports = Example;