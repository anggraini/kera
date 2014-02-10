define([
  'jquery',
  'underscore',
  'backbone',
  'events',
  'text!templates/login/login.html'
], function($, _, Backbone, Events, template){
  var View = Backbone.View.extend({
    el: 'body',
    events: {
      'click .btn': 'login'
    },
    render: function () {
      $('head title').html('Login Monitoring Cipta')
      $(this.el).html(template);
    },
    login: function(e){
      var self = this;
      this.$('.btn').button('loading');

      e.preventDefault();

      this.model.save({
          username: this.$('[name="username"]').val(),
          password: this.$('[name="password"]').val(),
          rememberme: this.$('[name="rememberme"]').val()
      }, {
          wait: true,
          success: function () {
            window.location.hash = 'beranda';
          },
          error: function (model, xhr) {
            alert (xhr.responseText);
          },
          complete: function(){
            self.$('.btn').button('reset');
          },
          reset: true
      });
    }
  });
  return View;
});
