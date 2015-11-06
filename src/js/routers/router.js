var
  // menu
    Backbone = require('backbone'),
    _ = require('underscore'),

    MenuCollection  = require('../collections/menuItemCollection'),
    MenuModel  = require('../models/menuItem'),
    MenuItemView  = require('../views/menuItemView'),
    MenuView  = require('../views/menuView'),
    AttachFastClick = require('fastclick');





// Backbone Zombies Run !
// https://lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/

Backbone.View.prototype.close = function(){
  this.remove();
  this.unbind();
  if (this.onClose){
    this.onClose();
  }
};

module.exports =  Backbone.Router.extend({

  routes: {
    "": "home",
    "item1"  : "item1",
    "item2"  : "item2"
  },

  count: 0,

  initialize: function (options){ // router constructor
    // the scope
    var self = this;

    // start html5 history for Router #
    Backbone.history.start({
      pushState: false,
      root: "informes/index.html"
    });

    // generate menu
    this.createMenu();

  },

  execute: function() {
    // set active to current menuItem.
    this.setMenuItemActive();
  },

  home: function (){
    console.log("home");
  },

  item1: function(){
    console.log("mo");

  },

  item2: function(){
    console.log("mi");
  },

  createMenu: function(){
    var self = this;
    this.menuCollection = new MenuCollection();
    this.menuView = new MenuView({ collection: this.menuCollection});
    this.menuCollection.fetch({
      success:function(){
        self.setMenuItemActive();
      }
    });
  },

  /**
   * Start functions in vars
   * @return void
   */
  initView: function (ff){
    var varName = this.toLowerCaseFirst(ff);
    this.varName = new ff();
  },

  /**
   * Set atribute in menu collection.
   * @return mixed void
   */
  setMenuItemActive: function(){
    if(this.menuCollection === undefined) return;
    var url = Backbone.history.getFragment();
    var modelToActivate = false;
    this.menuCollection.find(function(model){
      if(model.get('url') == url) model.set("isSelected", true);
      else model.set("isSelected", false);
    });
  }

  //...
});