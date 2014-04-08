

App.VideosView = Backbone.View.extend({
	initialize:function(data){
		this.render();
	},
	template:"tpl_videos",
	render:function(){
		this.loadTemplate(this.template, {}, {replace:true} );
		return this;
	},
	beforeClose:function(){
		
	}
});

