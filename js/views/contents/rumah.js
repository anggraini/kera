define([
  'jquery',
  'underscore',
  'backbone',
  'events',
  'models/modaldialog/rumahdijual',
  'text!templates/contents/rumah.html'
], function($, _, Backbone, Events, Modelrumahdijual, template){
  var View = Backbone.View.extend({
    el: '#views_contents_rumah',
    initialize: function(){
      var self = this;
      this.collection.on('reset', function(these){
        _.each(these.models, function(model){
          var found = $('#' + model.get('rumah_id'));
          if (found.length){
            $(found).attr('data-rumahstatus_id', model.get('rumahstatus_id')).attr('data-rumah_id', model.id);
          }else
            console.log('id : ' + model.get('rumah_id') + ', tidak ditemukan di svg rumah');
        });
      }, this);

      this.model_modaldialog_rumahdijual = new Modelrumahdijual();
      this.model_modaldialog_rumahdijual.on('sync', function(){
        self.showModalDialog();
      });
      Events.off('checkRumah');
      Events.on('checkRumah', function(id){
        this.model_modaldialog_rumahdijual.set({'id': id} ,{silent: true, reset: true});
        this.model_modaldialog_rumahdijual.fetch();
      }, this)
    },
    events: {
      'click g.rumah rect[data-rumahstatus_id=1]':'checkRumah',
      'click g.rumah rect[data-rumahstatus_id=2]':'checkRumah',
      'click g.rumah rect[data-rumahstatus_id=3]':'checkRumah'
    },
    checkRumah: function(e){
      this.$('g.rumah rect').removeAttr('terpilih');
      this.$(e.currentTarget).attr('terpilih', true);
      var data = this.collection.get(this.$(e.currentTarget).attr('data-rumah_id'));
      this.model_modaldialog_rumahdijual.set({'id': data.id} ,{silent: true});
      this.model_modaldialog_rumahdijual.fetch();
    },
    render: function () {
      $(this.el).html(template);
    },
    showModalDialog: function(){
      var self = this;
      if (parseInt(this.model_modaldialog_rumahdijual.get('rumahstatus_id')) == 1){
        requirejs([
          'views/modaldialog/rumahdijual'
          ],function(View){
            new View({model: self.model_modaldialog_rumahdijual}).render();
        });
      } else if (parseInt(self.model_modaldialog_rumahdijual.get('rumahstatus_id')) == 2){
        requirejs([
          'views/modaldialog/konfirmasipembelianrumah'
          ], function(View){
            var view = new View({model: self.model_modaldialog_rumahdijual});
            view.render();
        });
      } else if (parseInt(self.model_modaldialog_rumahdijual.get('rumahstatus_id')) == 3){
        requirejs([
          'views/modaldialog/rumahterjual'
          ], function(View){
            new View({model: self.model_modaldialog_rumahdijual}).render();
        });
      }
    }
  });
  return View;
});
