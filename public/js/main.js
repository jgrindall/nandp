



App.init = function(){
	App.router = new App.Router();
	Backbone.history.start();
};

$(document).ready(App.init);
