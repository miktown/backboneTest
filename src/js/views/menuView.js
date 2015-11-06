var
	Backbone = require('backbone'),
	MenuItemView = require('../views/menuItemView');

module.exports = Backbone.View.extend({

        el: "#ria-informes-menu",

        initialize: function() {
           this.collection.bind('add', this.addMenuItem, this);
        },

        addMenuItem: function(model){
            var item = new MenuItemView({model: model});
            this.$el.append(item.render().el);
        }
});