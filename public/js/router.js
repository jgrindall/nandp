
App.Router = Backbone.Router.extend({
	
    routes:{
		""									:	"main",
		"main"								:	"main"
    },
	initialize:function () {
		// this.page is the current page that's shown.
		this.page = null;
    },
	main:function(){
		var v = new App.MainView( );
		this.changePage(v);
	},
    changePage:function (page, analyticsData) {
		if(this.page){
			this.page.close();
		}
		$('#container').append(page.$el);
		this.page = page;
		if(this.page.afterAdded){
			this.page.afterAdded();
		}
    }
});