

App.SimitriPageView = Backbone.View.extend({
	initialize:function(data){
		this.render();
	},
	template:"tpl_simitripage",
	addChildren:function(){
		
	},
	render:function(){
		this.loadTemplate(this.template, {}, {replace:true} );
		this.addChildren();
		return this;
	},
	beforeClose:function(){
		
	}
});


