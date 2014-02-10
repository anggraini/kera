define([
  'jquery',
  'backbone',
  'text!templates/menu/menu.html',
  'metismenu'
], function($, Backbone, template){
  var View = Backbone.View.extend({
    el: '.navbar-static-side',
    render: function () {
      $(this.el).html(template);
      this.$('#side-menu').metisMenu();

      $(window).bind("load resize", function() {
        if ($(this).width() < 768)
            this.$('.sidebar-collapse').addClass('collapse');
        else
            this.$('.sidebar-collapse').removeClass('collapse');
      });
    }
  });
  return View;
});
