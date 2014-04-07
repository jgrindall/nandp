

App.HeaderView = Backbone.View.extend({
	initialize:function(data){
		this.render();
		this.model = data.model;
		this.listenTo(this.model, "change", this.changeSelected, this);
	},
	template:"tpl_header",
	changeSelected:function(){
		var s, i = this.model.get("shown");
		this.$("li").removeClass("active");
		s = "li:nth-child(" + (i + 1) + ")";
		this.$(s).addClass("active");
	},
	render:function(){
		this.loadTemplate(this.template, this.model.toJSON(), {replace:true} );
		this.changeSelected();
		return this;
	},
	beforeClose:function(){
		
	}
});

