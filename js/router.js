// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'vm'
], function ($, _, Backbone, Vm) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      '*actions': 'defaultAction'
    }
  });

  var initialize = function(options){
  var appView = options.appView;
  var router = new AppRouter(options);
   Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});
