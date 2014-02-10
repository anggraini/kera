define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/modaldialog/konfirmasipembelianrumah.html'
], function($, _, Backbone, template){
  var View = Backbone.View.extend({
    className: 'modal fade',
    initialize: function(){
      this.$el.attr('role', 'dialog');
      this.$el.attr('aria-hidden', 'true');
      this.$el.attr('aria-lebelledby', 'modallabel');
      this.$el.attr('tabindex', '-1');
    },
    render: function () {
      var self = this;
      $(this.el).html(_.template(template, this.model.toJSON()));
      this.$el.modal('show');
      this.$el.on('hidden.bs.modal', function () {
        self.remove();
      });
    }
  });
  return View;
});
