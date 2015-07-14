var Resource = Backbone.Model.extend({
	idAttribute: "_id",
	url: "/resources"
});

var Resources = Backbone.Collection.extend({
	url: "/resources",
	model: Resource
});


var ResourceView = Backbone.View.extend({
	tagname: 'div',
	attributes : {
		"class" : "col-md-2"
	},
	events: {
		".close input" : function(e) {
			$()
		}
	},
	template: _.template($("#resourceTemplate").text()),
	render: function() {
		this.$el.html(this.template(this.model.attributes));
    	return this;
	}
});

var NewResourceFormView = Backbone.View.extend({
	tagname: 'div',
	attributes : {
		"class" : "col-md-3"
	},
	events: {
		'click #saveResource' : function(e) {
			var self = this;
			//Save it
			this.model = new Resource();
			this.model.save({
				link: $("#resource").val(),
				linkText: $("#resource-text").val()
			}, 
			{
				success: function(model, response, options) {
					//Put this in the collection passed in on creation, append the result
					var resourceView = new ResourceCollectionView({collection: self.collection});
					
					self.collection.add(model);
					
					resourceView.render();
					if (self.collectionLocation) {
						$(self.collectionLocation).html(resourceView.$el);
					} else {
						$("#resources").html(resourceView.$el);
					}
				}
			});
			
		}
	},
	template: _.template($("#newResourceForm").text()),
	render: function() {
		this.$el.html(this.template());
    	return this;
	}
});

var ResourceCollectionView = Backbone.View.extend({
	tagname: 'div',
	attributes : {
		"class" : "resources"
	},
	events: {
		'click .close' : 'remove'
	},
	render : function() {
		this.$el.empty();
		this.collection.each(function(resource) {
			var resourceView = new ResourceView({model: resource});
			resourceView.render();
			this.$el.append(resourceView.$el);
		}, this);
	},
	remove: function() {
		//Find what one was clicked
		var id = this.$("input").val();
		//Remove it from the collection
		this.collection.remove(id);
		//Rerender and replace
		var p = this.el.parent;
		this.render();
		$(p).append(this.$el);
	}
});