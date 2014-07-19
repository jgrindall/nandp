var App={};App.ImageLoader=function(b,a){this.options=a;this.numLoaded=0;this.srcs=b;this.imgs=[];this.load()};App.ImageLoader.prototype.imgLoaded=function(){this.numLoaded++;if(this.numLoaded===this.srcs.length){this.options.success()}};App.ImageLoader.prototype.load=function(){var a=this;$.each(this.srcs,function(d,e){var b=new Image();var c=$(b);c.on("load",$.proxy(a.imgLoaded,a));c.on("error",$.proxy(a.imgLoaded,a));c.attr("src",e)})};App.EventDispatcher=_.extend({},Backbone.Events);Backbone.View.isTouch=function(){try{if(("ontouchstart" in window)||window.DocumentTouch&&(document instanceof DocumentTouch)){return true}}catch(a){return false}return false};Backbone.View.getHtml=function(e,d){var c=$("#"+e).html();var a=$.trim(c);var b=_.template(a);return b(d)};Backbone.View.prototype.beforeClose=function(){};Backbone.View.prototype.afterAdded=function(){};Backbone.View.getTouch=function(e){var c,b,a,d;c={};if(Backbone.View.isTouch()){b="touchstart";a="touchstart";d="touchend"}else{b="click";a="mousedown";d="mouseup"}_.each(e,function(h,f){var g=f.replace("_click",b);g=g.replace("_mousedown",a);g=g.replace("_mouseup",d);g=g.replace("_swipe","swipe");c[g]=h});return c};Backbone.View.prototype.extendEvents=function(b,a){if(_.isFunction(this.events)){return _.extend({},b.prototype.getEvents(),this.events())}else{return _.extend({},b.prototype.getEvents(),this.events)}};Backbone.View.prototype.getEvents=function(){if(_.isFunction(this.events)){return this.events()}else{return this.events}};Backbone.View.prototype.stopProp=function(a){if(a){a.stopPropagation();a.preventDefault()}};Backbone.View.prototype.close=function(){this.beforeClose();this.stopListening();this.remove();this.unbind()};Backbone.View.prototype.rerender=function(){var c,b,f,a,d,e;c=this.$el.parent();b=this.$el.index();f=c.children();a=f.length;if(a>=2){if(b>=1){d=f.eq(b-1)}if(b<=a-2){e=f.eq(b+1)}}this.$el.remove();this.render();if(d){d.after(this.$el)}else{if(e){e.before(this.$el)}else{c.append(this.$el)}}};Backbone.View.prototype.loadTemplate=function(d,c,a){var b=Backbone.View.getHtml(d,c);a=_.extend({replace:false},a);if(a.replace){this.setElement(b)}else{this.$el.html(b)}};App.Router=Backbone.Router.extend({routes:{"":"home",home:"home",work:"work",simitri:"simitri",logotacularapp:"logotacularapp",other:"other",contact:"contact",random:"random"},initialize:function(){this.page=null},home:function(){var a=new App.HomePageView();this.changePage(a,0)},other:function(){var a=new App.OtherPageView();this.changePage(a,2)},simitri:function(){var a=new App.SimitriPageView();this.changePage(a,2)},random:function(){var a=new App.RandomView();this.changePage(a,2)},logotacularapp:function(){var a=new App.LogotacularAppPageView();this.changePage(a,2)},contact:function(){var a=new App.ContactPageView();this.changePage(a,3)},work:function(){var a=new App.WorkPageView();this.changePage(a,1)},changePage:function(b,a){$("#container").empty();if(this.page){this.page.close()}$("#container").append(b.$el);this.page=b;if(this.page.afterAdded){this.page.afterAdded()}window.scrollTo(0,0);App.headerModel.set({shown:a})}});App.create=function(){App.headerModel=new App.HeaderModel();App.headerView=new App.HeaderView({model:App.headerModel});App.footerView=new App.FooterView()};App.preload=function(a){var b=["img/slide/rtm/slide10.png","img/slide/hmfs/slide2.png","img/slide/simitri/ipad6.png","img/logo/john.png"];new App.ImageLoader(b,a)};App.init=function(){App.create();App.router=new App.Router();App.preload({success:function(){$("body > #header").append(App.headerView.$el);$("body > #footer").append(App.footerView.$el);Backbone.history.start()}})};$(document).ready(App.init);App.HeaderModel=Backbone.Model.extend({defaults:{shown:0},sync:function(){}});App.HomePageView=Backbone.View.extend({initialize:function(a){this.render()},template:"tpl_homepage",addChildren:function(){this.v1=new App.IntroView();this.v2=new App.WorkBoxView();this.v3=new App.VideosView();this.$(".page-header").append(this.v1.$el).append(this.v2.$el).append(this.v3.$el)},render:function(){this.loadTemplate(this.template,{},{replace:true});this.addChildren();return this},beforeClose:function(){}});App.WorkPageView=Backbone.View.extend({initialize:function(a){this.data=a;this.render()},events:{},template:"tpl_workpage",addChildren:function(){var a;this.v0=new App.WorkView({num:0});this.v1=new App.WorkView({num:1});this.v2=new App.WorkView({num:2});this.v3=new App.WorkView({num:3});this.v4=new App.WorkView({num:4});this.v5=new App.WorkView({num:5});this.v6=new App.WorkView({num:6});this.v7=new App.WorkView({num:7});this.$(".page-header").append(this.v0.$el).append(this.v1.$el).append(this.v2.$el).append(this.v3.$el).append(this.v4.$el).append(this.v5.$el).append(this.v6.$el).append(this.v7.$el)},afterAdded:function(){},render:function(){this.loadTemplate(this.template,{},{replace:true});this.addChildren();return this},beforeClose:function(){}});App.OtherPageView=Backbone.View.extend({initialize:function(a){this.render()},template:"tpl_otherpage",addChildren:function(){this.v1=new App.OtherView({num:1});this.v2=new App.OtherView({num:2});this.v3=new App.OtherView({num:3});this.v4=new App.OtherView({num:4});this.v5=new App.OtherView({num:5});this.$(".page-header").append(this.v1.$el).append(this.v2.$el).append(this.v3.$el).append(this.v4.$el).append(this.v5.$el)},render:function(){this.loadTemplate(this.template,{},{replace:true});this.addChildren();return this},beforeClose:function(){}});App.SimitriPageView=Backbone.View.extend({initialize:function(a){this.render()},template:"tpl_simitripage",addChildren:function(){},render:function(){this.loadTemplate(this.template,{},{replace:true});this.addChildren();return this},beforeClose:function(){}});App.LogotacularAppPageView=Backbone.View.extend({initialize:function(a){this.render()},template:"tpl_logotacularapppage",addChildren:function(){},render:function(){this.loadTemplate(this.template,{},{replace:true});this.addChildren();return this},beforeClose:function(){}});App.ContactPageView=Backbone.View.extend({initialize:function(a){this.render()},template:"tpl_contact",addChildren:function(){},render:function(){this.loadTemplate(this.template,{},{replace:true});this.addChildren();return this},beforeClose:function(){}});App.VideosView=Backbone.View.extend({initialize:function(a){this.render()},template:"tpl_videos",render:function(){this.loadTemplate(this.template,{},{replace:true});return this},beforeClose:function(){}});App.RandomView=Backbone.View.extend({initialize:function(a){this.render()},template:"tpl_random",render:function(){this.loadTemplate(this.template,{},{replace:true});return this},beforeClose:function(){}});App.TextView=Backbone.View.extend({initialize:function(a){this.render()},template:"tpl_text",render:function(){this.loadTemplate(this.template,{},{replace:true});return this},beforeClose:function(){}});App.WorkView=Backbone.View.extend({initialize:function(a){this.data=a;this.template="tpl_work"+a.num;this.render()},render:function(){this.loadTemplate(this.template,{},{replace:true});return this},beforeClose:function(){}});App.OtherView=Backbone.View.extend({initialize:function(a){this.data=a;this.template="tpl_other"+this.data.num;this.render()},render:function(){this.loadTemplate(this.template,{},{replace:true});return this},beforeClose:function(){}});App.IntroView=Backbone.View.extend({initialize:function(a){this.render();setTimeout($.proxy(this.rot,this),1000);this.interval=setInterval($.proxy(this.rot,this),8000)},rot:function(){this.$rot.toggleClass("rot")},template:"tpl_intro",render:function(){this.loadTemplate(this.template,{},{replace:true});this.$rot=this.$(".biohazard");return this},beforeClose:function(){clearInterval(this.interval)}});App.FooterView=Backbone.View.extend({initialize:function(a){this.render()},template:"tpl_footer",render:function(){this.loadTemplate(this.template,{},{replace:true});return this},beforeClose:function(){}});App.AboutBoxView=Backbone.View.extend({initialize:function(a){this.render()},template:"tpl_aboutbox",render:function(){this.loadTemplate(this.template,{},{replace:true});return this},beforeClose:function(){}});App.HeaderView=Backbone.View.extend({initialize:function(a){this.render();this.model=a.model;this.listenTo(this.model,"change",this.changeSelected,this)},events:{"click ul.navbar-nav li a":"clickLi"},clickLi:function(){var a=this.$(".navbar-collapse");a.addClass("collapse").removeClass("in")},template:"tpl_header",changeSelected:function(){var b,a=this.model.get("shown");this.$("li").removeClass("active");b="li:nth-child("+(a+1)+")";this.$(b).addClass("active")},render:function(){this.loadTemplate(this.template,this.model.toJSON(),{replace:true});this.changeSelected();return this},beforeClose:function(){}});App.WorkBoxView=Backbone.View.extend({initialize:function(a){this.render()},template:"tpl_workbox",render:function(){this.loadTemplate(this.template,{},{replace:true});return this},beforeClose:function(){}});App.ButtonsView=Backbone.View.extend({initialize:function(a){this.render()},template:"tpl_buttons",render:function(){this.loadTemplate(this.template,{message:"Hi"},{replace:true});return this},beforeClose:function(){}});