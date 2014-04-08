

App.create = function(){
	App.headerModel = new App.HeaderModel();
	App.headerView = new App.HeaderView({"model":App.headerModel});
	$("body > #header").append(App.headerView.$el);
	App.footerView = new App.FooterView();
	$("body > #footer").append(App.footerView.$el);
};

App.init = function(){
	App.create();
	App.router = new App.Router();
	Backbone.history.start();
};

$(document).ready(App.init);
