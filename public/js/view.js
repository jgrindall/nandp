
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
