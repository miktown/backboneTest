var
    jQuery = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore');

module.exports = Backbone.View.extend({

    tagName: "section",

    className: "informes-section  firmaView",

    template: _.template('<iframe src="<%= url %>" style="position: relative; top: 0; left: 0; height: 320px; width: 240px" /><a id="returnHome" class="btn btn-primary btn-lg" href="#" role="button">Volver a home</a>'),

    events: {
       "click": "clickTest",
       "click #returnHome": "returnHome"
    },

    initialize: function() {
    },


    render: function() {
        this.delegateEvents();
        this.$el.html( this.template( this.model.toJSON() ));
        jQuery("#ria-informes-content").append(this.$el);
        return this;
    },

    onClose: function(){
        //this.model.unbind('change:isSelected', this.onSelectedChanged);
    },

    clickTest: function(){
        console.log("click hecho en firmaView");
    },

    returnHome: function(e){
        e.preventDefault();
        Backbone.app.navigate("", {trigger: true});
        console.log("click hecho");
    }

});