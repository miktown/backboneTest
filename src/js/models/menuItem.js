var Backbone = require('backbone');
module.exports = Backbone.Model.extend({
	defaults: {
        title: 'Informe',
		url: "#noInforme",
		icon: "",
	    isSelected: false
    }
});