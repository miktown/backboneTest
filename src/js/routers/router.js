var
  // deps
    Backbone = require('backbone'),
    _ = require('underscore'),

  // menu
    MenuCollection  = require('../collections/menuItemCollection'),
    MenuModel  = require('../models/menuItem'),
    MenuItemView  = require('../views/menuItemView'),
    MenuView  = require('../views/menuView'),

  // home View
    HomeView = require('../views/homeView'),
  // mo View
    MoView = require('../views/moView'),
  // mi View
    FirmaView = require('../views/firmaView'),
    UrlSignaturit = require('../models/urlSignaturit'),

  // fast click
    AttachFastClick = require('fastclick');




// TO-DO - refactor - esto no va aquí...
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
    "":"home",
    "ruta1":"unaview",
    "firma":"firmaview"
  },

  initialize: function (options){ // router constructor

    this.informesViews = {}; //init group of views for informes

    // start html5 history for Router #
    Backbone.history.start({
      pushState: true,
      root: "backboneTest/"
    });

    // fast click
    AttachFastClick(document.body);

    // generate menu
    this.createMenu();
  },

  execute: function(callback,args) {
    // eliminar las vistas activas de informes
    this.removeViews(this.informesViews);
    // ejecutar controlador por rutas
    callback.apply(this,args);
    // set active to current menuItem.
    this.setMenuItemActive();
  },

  home: function (){
    this.createHomeView();
  },

  unaview: function(){
    this.createMoView();
  },

  firmaview: function(){
    this.createFirmaView();
  },

  createHomeView: function(){
    this.informesViews.homeView = this.informesViews.homeView || new HomeView();
    this.informesViews.homeView.render();
  },

  createMoView: function(){
    this.informesViews.moView = this.informesViews.moView || new MoView();
    this.informesViews.moView.render();
  },

  createFirmaView: function(){
    var self = this;
    this.UrlSignaturitModel = this.UrlSignaturitModel || new UrlSignaturit();
    this.informesViews.firmaView = this.informesViews.firmaView || new FirmaView({ model: this.UrlSignaturitModel });
    this.informesViews.firmaView.fetch({
      success:function(){
        self.informesViews.firmaView.render();
      }
    });

  },

  /**
   * Elimina del dom y sus eventos de vistas agrupadas
   * @param  object groupOfViews [grupo de vistas]
   * @return void
   */
  removeViews: function(groupOfViews){
    _.each(groupOfViews,function(theView){
      theView.close();
    });
  },

  /**
   * Crea el menu de navegación
   * on success setea los estilos
   * según cuál esté seleccionado
   * @return void
   */
  createMenu: function(){
    var self = this;
    this.menuCollection = this.menuCollection || new MenuCollection();
    this.menuView = this.menuView || new MenuView({ collection: this.menuCollection});
    this.menuCollection.fetch({
      success:function(){
        self.setMenuItemActive();
      }
    });
  },

  /**
   * Set atribute in menu collection.
   * @return void
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