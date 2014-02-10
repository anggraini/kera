define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'events',
  'router'
], function($, _, Backbone, Vm, Events, Router){
  var AppView = Backbone.View.extend({
    el: 'body',
    render: function () {
      // var that = this;
      // $.ajax({
      //   url: global.server_path+'/auth',
      //   success: function(xhr){
      //       Events.trigger('router:navigate',(xhr && xhr.username) ? 'beranda' : 'login');
      //   },error: function(){
      //     Events.trigger('router:navigate','login');
      //   }
      // });
    }
  });
  return AppView;
});
