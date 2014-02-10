  define([
  'jquery',
  'underscore',
  'backbone',
  'events',
  'text!templates/modaldialog/pilihrumah.html'
  ], function($, _, Backbone, Events, template){
    var View = Backbone.View.extend({
      className: 'modal fade',
      initialize: function(){
        var self = this;
        this.$el.attr('role', 'dialog');
        this.$el.attr('aria-hidden', 'true');
        this.$el.attr('aria-lebelledby', 'modallabel');
        this.$el.attr('tabindex', '-1');
        this.collection.on('reset', function(collection){

          this.datablokandno = _.map(collection.models, function(model){
            return model.toJSON();
          });

          this.$('[name="blok"]').empty();
          var dataBlok = _.uniq(_.pluck(this.datablokandno, 'blok'));
          _.each(dataBlok, function(item){
              self.addOneBlok(item);
          });

          this.addOptionsNo();

        },this);
      },
      events: {
        'change [name="blok"]': 'addOptionsNo',
        'click .btn-success': 'submit'
      },
      render: function () {
        var self = this;
        $(this.el).html(_.template(template));
        this.$el.modal('show');
        this.$el.on('hidden.bs.modal', function(){
          self.remove();
        });
      },
      addOneBlok: function(item){
        this.$('[name="blok"]').append('<option value="'+item+'">'+item+'</option>');
      },
      addOptionsNo: function(){
        var self = this;
        this.$('[name="no"]').empty();
        var val = this.$('[name="blok"]').val();

        var data = _.each(this.datablokandno, function(item){
          if (val == item.blok)
            self.$('[name="no"]').append('<option value="'+item.id+'">'+item.no+'</option>');
        });
      },
      submit: function(){
        var id = self.$('[name="no"]').val();
        id && Events.trigger('checkRumah',id);
      }
    });
    return View;
  });
