global = {
  server_path : 'server.php'
};

requirejs.config({
  paths:{
   jquery:'../libs/jquery/jquery-2.0.3.min',
   jquery_panzoom: '../libs/jquery/jquery.panzoom.min',
   underscore: '../libs/underscore/underscore-min',
   backbone: '../libs/backbone/backbone-min',
   bootstrap: '../libs/bootstrap/bootstrap.min',
   bootstrap_wizard: '../libs/bootstrap/jquery.bootstrap.wizard.min',
   bootstrap_prompts: '../libs/bootstrap/bootstrap-prompts-alert',
   numeral: '../libs/general/numeral.min',  
    text: '../libs/require/text',
    templates: '../templates'
  },
  'shim': {
    jquery:{
        exports: 'jQuery'
    },
    jquery_panzoom:{
        deps: ['jquery']
    },
    underscore:{
        exports: '_'
    },
    bootstrap: {
        deps: ['jquery']
    },
    backbone: {
        deps: ['underscore','bootstrap'],
        exports: 'Backbone'
    },
    text: {
      deps: ['backbone']
    },
    bootstrap_wizard:{
      deps: ['bootstrap']
    },
    bootstrap_prompts:{
      deps: ['bootstrap']
    }
  },
  waitSeconds: 15
});

require([
    'views/app',
    'router',
    'vm',
    'bootstrap_prompts'
  ],
  function(ViewsApp, 
            Router,
            Vm){
    var view = Vm.create({}, 'ViewsApp', ViewsApp);
    view.render();
    Router.initialize({viewsApp: view});
});