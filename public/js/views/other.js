

App.OtherView = Backbone.View.extend({
	initialize:function(data){
		this.data = data;
		this.template = "tpl_other" + this.data.num;
		this.render();
	},
	render:function(){
		this.loadTemplate(this.template, {}, {replace:true} );
		return this;
	},
	beforeClose:function(){
		
	}
});

