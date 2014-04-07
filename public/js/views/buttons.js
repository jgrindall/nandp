

App.ButtonsView = Backbone.View.extend({
	initialize:function(data){
		this.render();
	},
	template:"tpl_buttons",
	render:function(){
		this.loadTemplate(this.template, {"message":"Hi"}, {replace:true} );
		return this;
	},
	beforeClose:function(){
		
	}
});
