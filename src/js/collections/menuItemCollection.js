var
	Backbone = require('backbone'),
    MenuItemModel  = require('../models/menuItem');

module.exports = Backbone.Collection.extend({

    model: MenuItemModel,
    url: "app/js/mocks/menu.json",

});