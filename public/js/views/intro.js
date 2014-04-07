

App.IntroView = Backbone.View.extend({
	initialize:function(data){
		this.render();
	},
	template:"tpl_intro",
	render:function(){
		this.loadTemplate(this.template, {}, {replace:true} );
		return this;
	},
	beforeClose:function(){
		
	}
});

