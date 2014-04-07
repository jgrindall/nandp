

App.WorkView = Backbone.View.extend({
	initialize:function(data){
		this.render();
	},
	template:"tpl_work",
	
	render:function(){
		this.loadTemplate(this.template, {"message":"Hi"}, {replace:true} );
		return this;
	},
	beforeClose:function(){
		
	}
});


