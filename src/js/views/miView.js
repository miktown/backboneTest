var
    jQuery = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore');

module.exports = Backbone.View.extend({

    tagName: "section",

    className: "informes-section  miView",

    template: _.template("<div class='jumbotron'><h1>Hello, bootstrap!</h1><p>...</p><p><a class='btn btn-primary btn-lg' href='#' role='button'>Volver a home</a></p></div>"),

    events: {
       "click": "clickTest"
    },

    initialize: function() {
    },


    render: function() {
        this.$el.html( this.template() );
        jQuery("#ria-informes-content").append(this.$el);
        return this;
    },

    onClose: function(){
        //this.model.unbind('change:isSelected', this.onSelectedChanged);
    },

    clickTest: function(){
        console.log("click hecho");
    }

});