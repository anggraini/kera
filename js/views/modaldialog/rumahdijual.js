define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/modaldialog/rumahdijual.html',
  'numeral'
], function($, _, Backbone, template){
  var View = Backbone.View.extend({
    className: 'modal fade',
    initialize: function(){
      this.$el.attr('role', 'dialog');
      this.$el.attr('aria-hidden', 'true');
      this.$el.attr('aria-lebelledby', 'modallabel');
      this.$el.attr('tabindex', '-1');
    },
    events:{
      'click [beli]':'beli',
    },
    render: function () {
      var self = this;
      $(this.el).html(_.template(template, this.model.toJSON()));
      this.$el.modal('show');
      this.$el.on('hidden.bs.modal', function () {
        self.remove();
      });
    },
    beli: function(){
      var self = this;
      $.ajax({
        url: global.server_path + '/formulirpembelianrumah/booking/'+this.model.id,
        method: 'POST',
        success: function(xhr){
          requirejs([
            'models/modaldialog/formulirpembelianrumah',
            'views/modaldialog/formulirpembelianrumah'], function(Model, View){
              var view = new View({
                model: new Model(),
                data: xhr});
              view.render();
          });
        },
        error: function(xhr){
          alert(xhr.responseText);
        }
      });
    }
  });
  return View;
});