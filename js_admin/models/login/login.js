define([
	'jquery',
    'backbone'
], function($, Backbone){
    return Backbone.Model.extend({
    	urlRoot: global.server_path + '/auth'
    });
});