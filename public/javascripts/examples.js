var Example = Backbone.Model.extend({
	idAttribute: "_id",
	url: "/examples"
});

var Examples = Backbone.Collection.extend({
	url: "/examples",
	model: Example
});


var ExampleView = Backbone.View.extend({
	tagname: 'div',
	attributes : {
		"class" : "col-md-2"
	},
	events: {
		".close input" : function(e) {
			$()
		}
	},
	template: _.template($("#exampleTemplate").text()),
	render: function() {
		this.$el.html(this.template(this.model.attributes));
    	return this;
	}
});

var NewExampleFormView = Backbone.View.extend({
	tagname: 'div',
	attributes : {
		"class" : "col-md-3"
	},
	events: {
		'click #saveExample' : function(e) {
			var self = this;
			//Save it
			this.model = new Example();
			this.model.save({
				link: $("#example").val(),
				linkText: $("#example-text").val()
			}, 
			{
				success: function(model, response, options) {
					//Put this in the collection passed in on creation, append the result
					var exampleView = new ExampleCollectionView({collection: self.collection});
					
					self.collection.add(model);
					
					exampleView.render();
					if (self.collectionLocation) {
						$(self.collectionLocation).html(exampleView.$el);
					} else {
						$("#examples").html(exampleView.$el);
					}
				}
			});
			
		}
	},
	template: _.template($("#newExampleForm").text()),
	render: function() {
		this.$el.html(this.template());
    	return this;
	}
});

var ExampleCollectionView = Backbone.View.extend({
	tagname: 'div',
	attributes : {
		"class" : "examples"
	},
	events: {
		'click .close' : 'remove'
	},
	render : function() {
		this.$el.empty();
		this.collection.each(function(example) {
			var exampleView = new ExampleView({model: example});
			exampleView.render();
			this.$el.append(exampleView.$el);
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