

App.create = function(){
	App.headerModel = new App.HeaderModel();
	App.headerView = new App.HeaderView({"model":App.headerModel});
	App.footerView = new App.FooterView();
};

App.preload = function(options){
	var srcs = ["img/slide/rtm/slide10.png", "img/slide/hmfs/slide2.png", "img/slide/simitri/ipad6.png", "img/logo/dog.png"];
	new App.ImageLoader(srcs, options);
};

App.init = function(){
	App.create();
	App.router = new App.Router();
	
	App.preload({"success":function(){
		$("body > #header").append(App.headerView.$el);
		$("body > #footer").append(App.footerView.$el);
		Backbone.history.start();
	}});

};

$(document).ready(App.init);

