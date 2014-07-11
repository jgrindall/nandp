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
