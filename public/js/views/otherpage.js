

App.OtherPageView = Backbone.View.extend({
	initialize:function(data){
		this.render();
	},
	template:"tpl_otherpage",
	addChildren:function(){
		this.v1 = new App.OtherView({"num":3});
		this.v2 = new App.OtherView({"num":1});
		this.v3 = new App.OtherView({"num":2});
		this.$(".page-header").append(this.v1.$el).append(this.v2.$el).append(this.v3.$el);
	},
	render:function(){
		this.loadTemplate(this.template, {}, {replace:true} );
		this.addChildren();
		return this;
	},
	beforeClose:function(){
		
	}
});


