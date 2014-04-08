

App.WorkView = Backbone.View.extend({
	initialize:function(data){
		this.data = data;
		this.template = "tpl_work" + data.num;
		this.render();
	},
	render:function(){
		this.loadTemplate(this.template, {}, {replace:true} );
		return this;
	},
	beforeClose:function(){
		
	}
});


