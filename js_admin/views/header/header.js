define([
  'jquery',
  'backbone',
  'text!templates/header/header.html'
], function($, Backbone, template){
  var View = Backbone.View.extend({
    el: '.navbar-static-top',
    render: function () {
      $(this.el).html(template);
    }
  });
  return View;
});
