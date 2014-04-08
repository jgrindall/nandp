

App.OtherPageView = Backbone.View.extend({
	initialize:function(data){
		this.render();
	},
	template:"tpl_otherpage",
	addChildren:function(){
		this.v1 = new App.AboutBoxView();
		this.$(".page-header").append(this.v1.$el);
	},
	render:function(){
		this.loadTemplate(this.template, {}, {replace:true} );
		this.addChildren();
		return this;
	},
	beforeClose:function(){
		
	}
});


