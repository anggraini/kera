define([
    'jquery',
    'backbone'
], function($, Backbone, Model){
    var Rumah = Backbone.Collection.extend({
        url: '../../server.php/rumah'
    });
});