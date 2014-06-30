
App.Router = Backbone.Router.extend({
	
    routes:{
		""									:	"home",
		"home"								:	"home",
		"work"								:	"work",
		"simitri"							:	"simitri",
		"other"								:	"other",
		"contact"							:	"contact"
    },
	initialize:function () {
		// this.page is the current page that's shown.
		this.page = null;
    },
	home:function(){
		var v = new App.HomePageView( );
		this.changePage(v, 0);
	},
	other:function(){
		var v = new App.OtherPageView( );
		this.changePage(v, 2);
	},
	simitri:function(){
		var v = new App.SimitriPageView( );
		this.changePage(v, 2);
	},
	contact:function(){
		var v = new App.ContactPageView( );
		this.changePage(v, 3);
	},
	work:function(){
		var v = new App.WorkPageView( );
		this.changePage(v, 1);
	},
   changePage:function (page, index) {
		if(this.page){
			this.page.close();
			$('#container').empty();
		}
		$('#container').append(page.$el);
		this.page = page;
		if(this.page.afterAdded){
			this.page.afterAdded();
		}
		window.scrollTo(0, 0);
		App.headerModel.set({"shown":index});
    }
});