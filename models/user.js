var _ = require('underscore');
var mongoose = require('mongoose');
var relationship = require('mongoose-relationship');

//Models with relationships


//Schema Definition
var userSchema = mongoose.Schema({
    name: {familyName: String, givenName: String},
    provider: String,
    provider_id: {type: String, required: true, unique: true},
    displayName: String,
    emails: [{ value: String, type: String }],
    photos: [{ value: String}],
    gender: String,
    created_at: Date,
  	updated_at: Date,
  	last_seen: Date
});

//This is gonna get complex if we add other logins.
//We have an image from Google+, or we should have some kind of default image. It has a "size" thing, which we're parsing out.
userSchema.methods.getImageURL = function(size) {
	if (this.photos.length > 0) {
		var imageURLRaw = this.photos[0].value;
		var imageURL = imageURLRaw.split("?")[0];
		if (size) {
			// This is google's url sizing method
			var imageURLSized = imageURL + "?sz=" + size;
			return imageURLSized;
		} else {
			return imageURL;
		}
	}
};

userSchema.pre('save', function(next) {
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

userSchema.methods.isInstructor = function() {
	return true;
};

//Model Definition
var User = mongoose.model('User', userSchema);

module.exports = User;
