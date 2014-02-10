define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/modaldialog/formulirpembelianrumah.html',
  'bootstrap_wizard'
  ], function($, _, Backbone, template){
    var View = Backbone.View.extend({
      id: 'formulirpembelianrumah',
      className: 'modal fade',
      initialize: function(options){
        this.options = options || {};

        this.$el.attr('role', 'dialog');
        this.$el.attr('aria-hidden', 'true');
        this.$el.attr('aria-lebelledby', 'modallabel');
        this.$el.attr('tabindex', '-1');
        this.$el.attr('data-backdrop', 'static');
        this.model.on('change', function(){

        });
      },
      events:{
        'click .finish': 'submit'
      },
      render: function () {
        var self = this;
        this.$el.html(_.template(template, this.options.data));
        this.$el.modal('show');
        this.$el.on('hidden.bs.modal', function(){

          self.remove();
        });
        self.$('[wizard]').bootstrapWizard({
          'tabClass': 'nav nav-pills',
          'onInit': function(){
            self.$('[wizard] #tab1').addClass('active');
          },
          onTabShow: function(tab, navigation, index){
            var total = navigation.find('li').length;
            var current = index + 1;
            if (current >= total){
              self.$('[wizard] .pager .next').hide();
              self.$('[wizard] .pager .finish').show().removeClass("disabled");
            }else{
              self.$('[wizard] .pager .next').show();
              self.$('[wizard] .pager .finish').hide();
            }
          }
        });
      },
      submit: function(){
        var self = this;
        this.$('.finish a').button('loading');
        this.model.save({
          pelanggan_nama: this.$('[name="pelanggan_nama"]').val(),
          pelanggan_noktp: this.$('[name="pelanggan_noktp"]').val(),
          pelanggan_notelp1: this.$('[name="pelanggan_notelp1"]').val(),
          pelanggan_notelp2: this.$('[name="pelanggan_notelp2"]').val(),
          pelanggan_notelp3: this.$('[name="pelanggan_notelp3"]').val(),
          pelanggan_alamat: this.$('[name="pelanggan_alamat"]').val(),
          rumah_id: this.options.data.id,
          carapembayaran_id: this.$('[name="carapembayaran"][checked]').val(),
          uangmuka: this.$('[name="uangmuka"]').val(),
          uangtandajadi: this.$('[name="uangtandajadi"]').val(),
          uangtandajadi_tgl: this.$('[name="uangtandajadi_tgl"]').val(),
          cicilanuangmuka1: this.$('[name="cicilanuangmuka1"]').val(),
          cicilanuangmuka1_tgl: this.$('[name="cicilanuangmuka1_tgl"]').val(),
          cicilanuangmuka2: this.$('[name="cicilanuangmuka2"]').val(),
          cicilanuangmuka2_tgl: this.$('[name="cicilanuangmuka2_tgl"]').val(),
          sampaitanggal15: this.$('[name="sampaitanggal15"]').val(),
          freelance_nama: this.$('[name="freelance_nama"]').val(),
          freelance_alamat: this.$('[name="freelance_alamat"]').val(),
          freelance_notelp1: this.$('[name="freelance_notelp1"]').val(),
          freelance_notelp2: this.$('[name="freelance_notelp2"]').val()
        }, {
          wait: true,
          success: function (model) {
              alert('berhasil melakukan formulir pembelian rumah');
              self.$('.finish a').button('reset');
          },
          error: function (model, response) {
              alert('gagal melakukan formulir pembelian rumah');
              self.$('.finish a').button('reset');
          },
          reset: true
        });
      }
    });
  return View;
});