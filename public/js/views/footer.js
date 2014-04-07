

App.FooterView = Backbone.View.extend({
	initialize:function(data){
		this.render();
	},
	template:"tpl_footer",
	render:function(){
		this.loadTemplate(this.template, {}, {replace:true} );
		return this;
	},
	beforeClose:function(){
		
	}
});

