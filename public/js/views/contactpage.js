

App.ContactPageView = Backbone.View.extend({
	initialize:function(data){
		this.render();
	},
	template:"tpl_contactpage",
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


