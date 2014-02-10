define([
	'jquery',
    'backbone'
], function($, Backbone){
    var Rumah = Backbone.Model.extend({
    	urlRoot: global.server_path + '/rumah'
    });
});