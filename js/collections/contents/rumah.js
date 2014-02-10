define([
    'jquery',
    'backbone',
    'models/contents/rumah'
], function($, Backbone, Model){
    return Backbone.Collection.extend({
    	url: global.server_path +'/rumah',
        model: Model
    });
});