// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'events',
  'text!templates/layout.html'
], function ($, _, Backbone, Vm, Events, template) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      'login': 'login',
      'beranda': 'beranda',
      'logout': 'logout',
      '*actions': 'defaultAction'
    }
  });

  var initialize = function(options){
    var appView = options.viewsApp;
    var router = new AppRouter(options);
    
    router.on('route:login', function(){
      require([
        'models/login/login',
        'views/login/login'], function(Model, View){
        var view = Vm.create(appView, 'Login', View, {model: new Model()});
        view.render();
      });
    });

    router.on('route:beranda', function(){
      cekAuth(function(){
        cekHasMenu();
        require([
          'views/beranda/beranda'], function(View){
          var view = Vm.create(appView, 'Beranda', View);
          view.render();
        });
      });     
    });

    router.on('route:logout', function (actions) {
      $.ajax({
        url: global.server_path + '/auth/logout',
        success: function(){
          window.location.hash = 'login';
        }
      });
    });

    router.on('route:defaultAction', function (actions) {
      cekAuth(function(){
        window.location.hash = 'beranda';
      });
    });
    
    var cekAuth = function(fn){
      $.ajax({
        url: global.server_path + '/auth',
        success: function(){
          fn && fn();
        },
        error: function(){
          window.location.hash = 'login';
        }
      });
    };

    var cekHasMenu = function(){
      (!$('#wrapper').length) &&  $('body').html(template);
        require([
          'views/header/header'], function(View){
          var view = Vm.create(appView, 'Header', View);
          view.render();
        });
        require([
          'views/menu/menu'], function(View){
          var view = Vm.create(appView, 'Menu', View);
          view.render();
        });
    }

    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});
