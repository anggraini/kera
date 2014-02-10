define([
    'jquery',
    'backbone',
    'models/modaldialog/pilihrumah'
], function($, Backbone, Model){
    return Backbone.Collection.extend({
    	url: global.server_path +'/rumah/blokandno',
        model: Model
    });
});