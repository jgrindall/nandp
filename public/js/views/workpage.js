

App.WorkPageView = Backbone.View.extend({
	initialize:function(data){
		this.render();
	},
	template:"tpl_workpage",
	addChildren:function(){
		this.v1 = new App.WorkView();
		this.v2 = new App.ButtonsView();
		this.$(".page-header").append(this.v1.$el).append(this.v2.$el);
	},
	render:function(){
		this.loadTemplate(this.template, {}, {replace:true} );
		this.addChildren();
		return this;
	},
	beforeClose:function(){
		
	}
});


