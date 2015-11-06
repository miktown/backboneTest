var
	Backbone = require('backbone'),
    MenuItemModel  = require('../models/menuItem');

module.exports = Backbone.Collection.extend({

    model: MenuItemModel,
    url: "src/js/mocks/menu.json",

});