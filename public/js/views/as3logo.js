

App.AS3LogoView = Backbone.View.extend({
	initialize:function(data){
		this.render();
	},
	template:"tpl_as3logo",
	render:function(){
		this.loadTemplate(this.template, {}, {replace:true} );
		return this;
	},
	beforeClose:function(){
		
	}
});

