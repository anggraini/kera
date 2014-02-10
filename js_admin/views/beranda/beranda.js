define([
  'jquery',
  'backbone',
  'text!templates/beranda/beranda.html'
], function($, Backbone, template){
  var View = Backbone.View.extend({
  	el: '#page-wrapper',
    render: function () {
      $(this.el).html(template);
    }
  });
  return View;
});
