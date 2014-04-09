

App.OtherPageView = Backbone.View.extend({
	initialize:function(data){
		this.render();
	},
	template:"tpl_otherpage",
	addChildren:function(){
		this.v1 = new App.OtherView({"num":1});
		this.v2 = new App.OtherView({"num":2});
		this.v3 = new App.OtherView({"num":3});
		this.v4 = new App.OtherView({"num":4});
		this.v5 = new App.OtherView({"num":5});
		this.$(".page-header").append(this.v1.$el).append(this.v2.$el).append(this.v3.$el).append(this.v4.$el).append(this.v5.$el);
	},
	render:function(){
		this.loadTemplate(this.template, {}, {replace:true} );
		this.addChildren();
		return this;
	},
	beforeClose:function(){
		
	}
});


