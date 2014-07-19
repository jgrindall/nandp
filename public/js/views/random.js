

App.RandomView = Backbone.View.extend({
	initialize:function(data){
		this.render();
	},
	template:"tpl_random",
	render:function(){
		this.loadTemplate(this.template, {}, {replace:true} );
		return this;
	},
	beforeClose:function(){
		
	}
});

