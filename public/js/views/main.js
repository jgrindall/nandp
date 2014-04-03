

App.MainView = Backbone.View.extend({
	initialize:function(data){
		this.render();
	},
	template:"tpl_main",
	render:function(){
		this.loadTemplate(this.template, {"message":"Hi"}, {replace:true} );
		return this;
	},
	beforeClose:function(){
		
	}
});

