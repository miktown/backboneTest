var
    jQuery = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore');

module.exports = Backbone.View.extend({

    tagName: "section",

    className: "informes-section moView",

    template: _.template("<div class='ria-spinner'/><h2>mooooooo</h2>"),

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