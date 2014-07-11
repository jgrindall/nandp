var App = {};
App.ImageLoader = function(srcs, options){
	this.options = options;
	this.numLoaded = 0;
	this.srcs = srcs;
	this.imgs = [ ];
	this.load();
};

App.ImageLoader.prototype.imgLoaded = function(){
	//console.log("loaded");
	this.numLoaded++;
	if(this.numLoaded === this.srcs.length){
		this.options.success();
	}
};

App.ImageLoader.prototype.load = function(){
	var _this = this;
	$.each(this.srcs, function(i, src){
		var img = new Image();
		var $img = $(img);
		$img.on("load", $.proxy(_this.imgLoaded, _this));
		$img.on("error", $.proxy(_this.imgLoaded, _this));
		//console.log(src);
		$img.attr("src", src);
	});
};
/*

// A global event dispatcher.
// Backbone has its own internal events system, but use this object to dispatch an event that anyone can listen to
// --------------------------

*/


App.EventDispatcher =  _.extend(  {}, Backbone.Events);


Backbone.View.isTouch = function(){
	try{
		if(('ontouchstart' in window) || window.DocumentTouch && (document instanceof DocumentTouch) ) {
			return true;
		}
	}
	catch(e){
		return false;		
	}
	return false;
};


Backbone.View.getHtml = function(id, data){
	var html = $('#'+id).html();
	var trim = $.trim(html);
	var tpl = _.template(trim);
	return tpl(data);
};

Backbone.View.prototype.beforeClose = function () {
	
};

Backbone.View.prototype.afterAdded = function () {
	
};


Backbone.View.getTouch = function(obj){
	// static function, depending on what device we're on, change the Backbone events
	var newObj, clickEventName, downEventName, upEventName;
	newObj = {};
	if(Backbone.View.isTouch()){
		clickEventName = "touchstart";
		downEventName = "touchstart";
		upEventName = "touchend";
	}
	else{
		clickEventName = "click";
		downEventName = "mousedown";
		upEventName = "mouseup";
	}
	_.each(obj, function(val, key){
		var newKey = key.replace("_click", clickEventName);
		newKey = newKey.replace("_mousedown", downEventName);
		newKey = newKey.replace("_mouseup", upEventName);
		newKey = newKey.replace("_swipe", "swipe");
		newObj[newKey] = val;
	});
	return newObj;
};



// extend the events from a parent class
// allows for inheritance of events
Backbone.View.prototype.extendEvents = function (superClass, events) {
	if(_.isFunction(this.events) ){
		return _.extend({}, superClass.prototype.getEvents(),this.events());
	}
	else{
		return _.extend({}, superClass.prototype.getEvents(),this.events);
	}
};
 
 
 
 
 
// get the events from a class

Backbone.View.prototype.getEvents = function () {
	// overridden in subclasses!
	if(_.isFunction(this.events) ){
		return this.events();
	}
	else{
		return this.events;
	}
};



// stop the event propagating, helper function

Backbone.View.prototype.stopProp = function (e) {
	if(e){
		e.stopPropagation();
		e.preventDefault();
	}
};


// extra method I added so that when we close a view we tidy up stuff
// make sure we tidy up memory leaks
Backbone.View.prototype.close = function () {
	// when we delete a view we call close() on it
	// call the beforeClose method, remove the element from the stage
	// and remove listeners
	this.beforeClose();
	this.stopListening();
	this.remove();
	this.unbind();
};



// rerender the view
Backbone.View.prototype.rerender = function(){
	// render and add back at the same position in the parent.
	// find where it was and add it back!
	var parent, index, siblings, len, before, after;
	parent = this.$el.parent();
	index = this.$el.index();
	siblings = parent.children();
	len = siblings.length;
	if(len >= 2){
		if(index >= 1){
			before = siblings.eq(index-1);
		}
		if(index <= len - 2){
			after = siblings.eq(index + 1);
		}
	}
	this.$el.remove();
	this.render();
	if(before){
		before.after(this.$el);
	}
	else if(after){
		after.before(this.$el);
	}
	else{
		parent.append(this.$el);
	}
};


// load data into the template
Backbone.View.prototype.loadTemplate = function (id, data, options) {
	// load template into view.  If replace then use the html itself, rather than adding it to a div
	var html = Backbone.View.getHtml(id, data);
	options = _.extend({"replace":false}, options);  // defaults
	if(options.replace){
		this.setElement(html);  // this will rebind the events on the element
	}
	else{
		this.$el.html(html);
	}
};

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
		$('#container').empty();
		if(this.page){
			this.page.close();
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


App.HeaderModel = Backbone.Model.extend({
	defaults:{
		"shown":0
	},
	sync:function(){
	
	}
});



App.HomePageView = Backbone.View.extend({
	initialize:function(data){
		this.render();
	},
	template:"tpl_homepage",
	addChildren:function(){
		this.v1 = new App.IntroView();
		this.v2 = new App.WorkBoxView();
		this.v3 = new App.VideosView();
		this.$(".page-header").append(this.v1.$el).append(this.v2.$el).append(this.v3.$el);
	},
	render:function(){
		this.loadTemplate(this.template, {}, {replace:true} );
		this.addChildren();
		return this;
	},
	beforeClose:function(){
		
	}
});




App.WorkPageView = Backbone.View.extend({
	initialize:function(data){
		this.data = data;
		this.render();
	},
	events:{
		
	},
	template:"tpl_workpage",
	addChildren:function(){
		var target;
		this.v0 = new App.WorkView({"num":0});
		this.v1 = new App.WorkView({"num":1});
		this.v2 = new App.WorkView({"num":2});
		this.v3 = new App.WorkView({"num":3});
		this.v4 = new App.WorkView({"num":4});
		this.v5 = new App.WorkView({"num":5});
		this.v6 = new App.WorkView({"num":6});
		this.v7 = new App.WorkView({"num":7});
		this.$(".page-header").append(this.v0.$el).append(this.v1.$el).append(this.v2.$el).append(this.v3.$el).append(this.v4.$el).append(this.v5.$el).append(this.v6.$el).append(this.v7.$el);
	},
	afterAdded:function(){
		
	},
	render:function(){
		this.loadTemplate(this.template, {}, {replace:true} );
		this.addChildren();
		return this;
	},
	beforeClose:function(){
		
	}
});




App.OtherPageView = Backbone.View.extend({
	initialize:function(data){
		this.render();
	},
	template:"tpl_otherpage",
	addChildren:function(){
		this.v1 = new App.OtherView({"num":1});
		this.v2 = new App.OtherView({"num":2});
		this.v3 = new App.OtherView({"num":3});
		this.v4 = new App.OtherView({"num":4});
		this.v5 = new App.OtherView({"num":5});
		this.$(".page-header").append(this.v1.$el).append(this.v2.$el).append(this.v3.$el).append(this.v4.$el).append(this.v5.$el);
	},
	render:function(){
		this.loadTemplate(this.template, {}, {replace:true} );
		this.addChildren();
		return this;
	},
	beforeClose:function(){
		
	}
});




App.SimitriPageView = Backbone.View.extend({
	initialize:function(data){
		this.render();
	},
	template:"tpl_simitripage",
	addChildren:function(){
		
	},
	render:function(){
		this.loadTemplate(this.template, {}, {replace:true} );
		this.addChildren();
		return this;
	},
	beforeClose:function(){
		
	}
});




App.ContactPageView = Backbone.View.extend({
	initialize:function(data){
		this.render();
	},
	template:"tpl_contact",
	addChildren:function(){
		
	},
	render:function(){
		this.loadTemplate(this.template, {}, {replace:true} );
		this.addChildren();
		return this;
	},
	beforeClose:function(){
		
	}
});




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



App.TextView = Backbone.View.extend({
	initialize:function(data){
		this.render();
	},
	template:"tpl_text",
	render:function(){
		this.loadTemplate(this.template, {}, {replace:true} );
		return this;
	},
	beforeClose:function(){
		
	}
});



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




App.OtherView = Backbone.View.extend({
	initialize:function(data){
		this.data = data;
		this.template = "tpl_other" + this.data.num;
		this.render();
	},
	render:function(){
		this.loadTemplate(this.template, {}, {replace:true} );
		return this;
	},
	beforeClose:function(){
		
	}
});



App.IntroView = Backbone.View.extend({
	initialize:function(data){
		this.render();
	},
	template:"tpl_intro",
	render:function(){
		this.loadTemplate(this.template, {}, {replace:true} );
		return this;
	},
	beforeClose:function(){
		
	}
});



App.FooterView = Backbone.View.extend({
	initialize:function(data){
		this.render();
	},
	template:"tpl_footer",
	render:function(){
		this.loadTemplate(this.template, {}, {replace:true} );
		return this;
	},
	beforeClose:function(){
		
	}
});



App.AboutBoxView = Backbone.View.extend({
	initialize:function(data){
		this.render();
	},
	template:"tpl_aboutbox",
	render:function(){
		this.loadTemplate(this.template, {}, {replace:true} );
		return this;
	},
	beforeClose:function(){
		
	}
});



App.HeaderView = Backbone.View.extend({
	initialize:function(data){
		this.render();
		this.model = data.model;
		this.listenTo(this.model, "change", this.changeSelected, this);
	},
	events:{
		"click ul.navbar-nav li a":"clickLi"
	},
	clickLi:function(){
		var collapse = this.$(".navbar-collapse");
		collapse.addClass("collapse").removeClass("in");
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



App.WorkBoxView = Backbone.View.extend({
	initialize:function(data){
		this.render();
	},
	template:"tpl_workbox",
	render:function(){
		this.loadTemplate(this.template, {}, {replace:true} );
		return this;
	},
	beforeClose:function(){
		
	}
});



App.ButtonsView = Backbone.View.extend({
	initialize:function(data){
		this.render();
	},
	template:"tpl_buttons",
	render:function(){
		this.loadTemplate(this.template, {"message":"Hi"}, {replace:true} );
		return this;
	},
	beforeClose:function(){
		
	}
});
