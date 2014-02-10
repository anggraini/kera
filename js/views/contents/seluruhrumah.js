define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/contents/seluruhrumah.html'
  ], function($, _, Backbone, template){
    var View = Backbone.View.extend({
      el:'.page',
      
      render:function(){
        this.$el.html('content di sini');
      }
});
    var view =  new View();
  });