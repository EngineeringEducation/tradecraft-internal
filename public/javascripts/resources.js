var Resource = Backbone.Model.extend({
	idAttribute: "_id"
});

var Resources = Backbone.Collection.extend({
	url: "/resources",
	model: Resource
});


var ResourceView = Backbone.View.extend({
	tagname: 'div',
	attributes : {
		"class" : "col-md-3"
	},
	events: {
		'click' : function(e) {
			this.$(".panel").toggleClass("panel-default");
			this.$(".panel").toggleClass("panel-info");
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
		'click' : function(e) {
			this.$(".panel").toggleClass("panel-default");
			this.$(".panel").toggleClass("panel-info");
		}
	},
	template: _.template($("#unitTemplate").text()),
	render: function() {
		this.$el.html(this.template(this.model.attributes));
    	return this;
	}
});