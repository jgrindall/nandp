

App.create = function(){
	App.headerModel = new App.HeaderModel();
	App.headerView = new App.HeaderView({"model":App.headerModel});
	App.footerView = new App.FooterView();
};

App.preload = function(options){
	var srcs = ["img/simitri/ipad1.png", "img/simitri/ipad2.png", "img/simitri/ipad3.png", "img/logo/logosmall.png","img/logo/dog.png","img/video/video1.png","img/video/video2.png","img/clients/clients.png","img/slide/hmfs/slide1.png","img/slide/hmfs/slide2.png","img/slide/hmfs/slide3.png","img/slide/hmfs/slide4.png","img/workother/connect4_screen.jpg","img/workother/lego1.png"];
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

