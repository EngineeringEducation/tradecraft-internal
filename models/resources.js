var mongoose = require('mongoose');
var relationship = require('mongoose-relationship');

//Schema Definition
var resourceSchema = mongoose.Schema({
    link: String,
    linkText: String
});



// on every save, add the date
resourceSchema.pre('save', function(next) {
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
var Resources = mongoose.model('Resource', resourceSchema);

module.exports = Resources;