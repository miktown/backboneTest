var
    jQuery = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore');

module.exports = Backbone.View.extend({

    tagName: "p",

    className: "homeView",

    template: _.template("wannaaaaaaaaa."),

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