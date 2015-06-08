var _ = require('underscore');

var googleExample = { provider: 'google',
id: '111718014976290947180',
displayName: 'Liz Howard',
name: { familyName: 'Howard', givenName: 'Liz' },
emails: [ { value: 'liz@tradecrafted.com', type: 'account' } ],
photos: [ { value: 'https://lh5.googleusercontent.com/-u5YT7MjTigA/AAAAAAAAAAI/AAAAAAAAACU/iSwxeQfdSH4/photo.jpg?sz=50' } ],
gender: 'female',
_raw: '{\n "kind": "plus#person",\n "etag": "\\"RqKWnRU4WW46-6W3rWhLR9iFZQM/UhMUjC0RmR_TpZmuJ8BzmBwYgDQ\\"",\n "gender": "female",\n "emails": [\n  {\n   "value": "liz@tradecrafted.com",\n   "type": "account"\n  }\n ],\n "objectType": "person",\n "id": "111718014976290947180",\n "displayName": "Liz Howard",\n "name": {\n  "familyName": "Howard",\n  "givenName": "Liz"\n },\n "url": "https://plus.google.com/111718014976290947180",\n "image": {\n  "url": "https://lh5.googleusercontent.com/-u5YT7MjTigA/AAAAAAAAAAI/AAAAAAAAACU/iSwxeQfdSH4/photo.jpg?sz=50",\n  "isDefault": false\n },\n "isPlusUser": true,\n "language": "en",\n "circledByCount": 2,\n "verified": false,\n "domain": "tradecrafted.com"\n}\n',
_json: 
 { kind: 'plus#person',
   etag: '"RqKWnRU4WW46-6W3rWhLR9iFZQM/UhMUjC0RmR_TpZmuJ8BzmBwYgDQ"',
   gender: 'female',
   emails: [ [Object] ],
   objectType: 'person',
   id: '111718014976290947180',
   displayName: 'Liz Howard',
   name: { familyName: 'Howard', givenName: 'Liz' },
   url: 'https://plus.google.com/111718014976290947180',
   image: 
    { url: 'https://lh5.googleusercontent.com/-u5YT7MjTigA/AAAAAAAAAAI/AAAAAAAAACU/iSwxeQfdSH4/photo.jpg?sz=50',
      isDefault: false },
   isPlusUser: true,
   language: 'en',
   circledByCount: 2,
   verified: false,
   domain: 'tradecrafted.com' } 
}


var User = function(options) {
	_.extend(this, options);
	if (options.db) {
		this.db = options.db;
	} else {
		this.err = "No DB Attached!"
	}
	this.loginProfile = options.loginProfile || {provider : "none"};
};

User.prototype.findOrCreate = function(done) {
	var self = this;
	// Basically, does this exist in the database, if so add our data to the substantial amount of data we get from the google profile.
	self.db.query("SELECT id,created,name,email,provider,provider_id,status,cohort, start_date FROM users WHERE provider = $1 AND provider_id = $2", [self.loginProfile.provider, self.loginProfile.id], function(err, results) {
		if (!err) {
			if (results.length > 0) {
				_.extend(results.rows[0], self);
			} else {
				//create user
				// Get their account email, not other random emails
				var email = _.findWhere(self.loginProfile.emails, {type: 'account'});
				self.db.query("INSERT INTO users (name,email,provider,provider_id,status) VALUES ($1, $2, $3, $4, $5)", [self.loginProfile.name, email, self.loginProfile.provider, self.loginProfile.id, 'student'], function (err, results) {
					if (!err) {
						self.db.query("SELECT id,created,name,email,provider,provider_id,status,cohort, start_date FROM users WHERE provider = $1 AND provider_id = $2", [self.loginProfile.provider, self.loginProfile.id], function(err, results) {
							if (!err) {
								if (results.length > 0) {
									_.extend(results.rows[0], self);
									done(err, self);
								} else {
									done(err, self);
								}
							} else {
								done(err, self);
							}
						});
					} else {
						done(err, self);
					}
				});
			}
		} else {
			done(err, self);
		}	
	});
};

module.exports = User;
