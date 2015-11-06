var
    _ = require('underscore'),
    Backbone = require('backbone');

module.exports = Backbone.View.extend({

    tagName: "li",

    className: "ria-menu-item",

    template: _.template("<a href='<%= url %>' class='dashicons-before <%= icon %>'> <%= title %></a>"),

    events: {
        "click": "navigateRoute"
    },

    initialize: function() {
        this.model.bind('add', this.render, this);
        this.model.on('change:isSelected', this.highlight, this);
    },

    render: function() {
        this.$el.html( this.template( this.model.toJSON() ));
        return this;
    },

    navigateRoute: function(e){
        e.preventDefault();
        var url = this.model.get('url');
        Backbone.app.navigate(url, {trigger: true});
    },

    highlight: function() {
        var isSelected = this.model.get('isSelected');
        if(isSelected) this.$el.addClass('active');
        else this.$el.removeClass('active');
    },

    onClose: function(){
        this.model.unbind('change:isSelected', this.onSelectedChanged);
    }

});