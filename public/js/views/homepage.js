

App.HomePageView = Backbone.View.extend({
	initialize:function(data){
		this.render();
	},
	template:"tpl_homepage",
	addChildren:function(){
		this.v1 = new App.IntroView();
		this.v2 = new App.WorkBoxView();
		this.v3 = new App.AboutBoxView();
		this.v4 = new App.FooterView();
		this.$(".page-header").append(this.v1.$el).append(this.v2.$el).append(this.v3.$el).append(this.v4.$el);
	},
	render:function(){
		this.loadTemplate(this.template, {}, {replace:true} );
		this.addChildren();
		return this;
	},
	beforeClose:function(){
		
	}
});


