var
	Backbone = require('backbone'),
    MenuItemModel  = require('../models/menuItem');

module.exports = Backbone.Collection.extend({

    model: MenuItemModel,
    url: "backboneTest/app/js/mocks/menu.json",

});