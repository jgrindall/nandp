

App.WorkPageView = Backbone.View.extend({
	initialize:function(data){
		this.data = data;
		this.render();
	},
	events:{
		
	},
	template:"tpl_workpage",
	addChildren:function(){
		var target;
		this.v0 = new App.WorkView({"num":0});
		this.v1 = new App.WorkView({"num":1});
		this.v2 = new App.WorkView({"num":2});
		this.v3 = new App.WorkView({"num":3});
		this.v4 = new App.WorkView({"num":4});
		this.v5 = new App.WorkView({"num":5});
		this.v6 = new App.WorkView({"num":6});
		this.v7 = new App.WorkView({"num":7});
		this.$(".page-header").append(this.v0.$el).append(this.v1.$el).append(this.v2.$el).append(this.v3.$el).append(this.v4.$el).append(this.v5.$el).append(this.v6.$el).append(this.v7.$el);
	},
	afterAdded:function(){
		
	},
	render:function(){
		this.loadTemplate(this.template, {}, {replace:true} );
		this.addChildren();
		return this;
	},
	beforeClose:function(){
		
	}
});


