var
    jQuery = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore');

module.exports = Backbone.View.extend({

    tagName: "section",

    className: "informes-section moView",

    template: _.template("<div class='ria-spinner'/><h2>una vista</h2><a id='returnHome' class='btn btn-primary btn-lg' href='#' role='button'>Volver a home</a>"),

    events: {
       "click": "clickTest",
       "click #returnHome": "returnHome"
    },

    initialize: function() {
    },


    render: function() {
        this.delegateEvents();
        this.$el.html( this.template() );
        jQuery("#ria-informes-content").append(this.$el);
        return this;
    },

    onClose: function(){
        //this.model.unbind('change:isSelected', this.onSelectedChanged);
    },

    clickTest: function(){
        console.log("click hecho en moView");
    },

    returnHome: function(e){
        e.preventDefault();
        Backbone.app.navigate("", {trigger: true});
        console.log("click hecho");
    }

});