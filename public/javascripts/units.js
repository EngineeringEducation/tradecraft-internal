//Unit Model, Collection, View
var Unit = Backbone.Model.extend({
	idAttribute: "_id",
	defaults: {
		subject: "No Subject",
		overview: "No Overview"
	}
});

var Units = Backbone.Collection.extend({
	url: "/units",
	model: Unit
});

var UnitView = Backbone.View.extend({
	initialize: function(){
		this.model.bind("change", this.render, this);
	},
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

var UnitCollectionView = Backbone.View.extend({
	initialize: function(){
		this.model.bind("change", this.render, this);
	},
	tagname: 'div',
	attributes : {
		"class" : "units"
	},
	events: {
		'click .close' : 'close'
	},
	render : function() {
		this.$el.empty();
		this.collection.each(function(unit) {
			var unitView = new UnitView({model: unit});
			unitView.render();
			this.$el.append(unitView.$el);
		}, this);
	},
	close: function(e) {
		//Find what one was clicked
		//#TODO: Too brittle to do manual traversal, should use a selector, which I'll figure out later.
		var id = $(e.target.parentNode.parentNode.parentNode.children[1].children[0]).val();
		//Remove it from the collection
		this.collection.remove(id);
		//Rerender and replace
		var p = this.el.parent;
		this.render();
		$(p).append(this.$el);
	}
});