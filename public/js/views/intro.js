

App.IntroView = Backbone.View.extend({
	initialize:function(data){
		this.render();
		setTimeout($.proxy(this.rot, this), 1000);
		this.interval = setInterval($.proxy(this.rot, this), 8000);
	},
	rot:function(){
		this.$rot.toggleClass("rot");
	},
	template:"tpl_intro",
	render:function(){
		this.loadTemplate(this.template, {}, {replace:true} );
		this.$rot = this.$(".biohazard");
		return this;
	},
	beforeClose:function(){
		clearInterval(this.interval);
	}
});

