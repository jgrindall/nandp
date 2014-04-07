

App.WorkBoxView = Backbone.View.extend({
	initialize:function(data){
		this.render();
	},
	template:"tpl_workbox",
	render:function(){
		this.loadTemplate(this.template, {}, {replace:true} );
		return this;
	},
	beforeClose:function(){
		
	}
});

