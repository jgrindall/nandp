
App.LogotacularAppPageView = Backbone.View.extend({
	initialize:function(data){
		this.render();
	},
	template:"tpl_logotacularapppage",
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

