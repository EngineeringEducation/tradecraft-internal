//Unit Model, Collection, View (factor out when done.)
var Unit = Backbone.Model.extend({
	idAttribute: "_id",
});

var Units = Backbone.Collection.extend({
	url: "/units",
	model: Unit
});

var UnitView = Backbone.View.extend({
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
	tagname: 'div',
	attributes : {
		"class" : "units"
	},
	events: {
		'click .close' : 'remove'
	},
	render : function() {
		this.$el.empty();
		this.collection.each(function(unit) {
			var unitView = new UnitView({model: unit});
			unitView.render();
			this.$el.append(unitView.$el);
		}, this);
		//WHY DO I HAVE TO REDELEGATE EVENTS MANUALLY
		this.delegateEvents(this.events);
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