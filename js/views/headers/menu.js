define([
  'jquery',
  'backbone',
  'text!templates/header/menu.html'
], function($, Backbone, template){
  var View = Backbone.View.extend({
    el: '#views_headers_menu',
    events:{
        'click [modaldialog_pilihrumah]': 'modaldialog_pilihrumah',
    	'click [auth_login]':'auth_login',
        'click [auth_logout]': 'auth_logout'
    },
    render: function () {
    	this.$el.html(template);
		var self = this;
		$.ajax({
			url: global.server_path + '/auth/login_groupsales',
			success: function(xhr){
				self.form('logout', xhr);
			},
			error: function(){
				self.form('login');
			}
		});
    },
    modaldialog_pilihrumah: function(){
        requirejs([
            'collections/modaldialog/pilihrumah',
            'views/modaldialog/pilihrumah'],
        function(Collection, View){
            var collection = new Collection();
            var view = new View({collection: collection});
            view.render();
            collection.fetch({reset: true});
        });
    },
    auth_login: function(){
    	var self = this;
    	$.ajax({
    		url: global.server_path + '/auth/login_groupsales',
    		method: 'POST',
    		data:{
    			username: this.$('[name="username"]').val(),
    			password: this.$('[name="password"]').val(),
    			rememberme: this.$('[name="rememberme"]').is(':checked')?1:0
    		},
    		beforeSend: function(){
                self.$('form[login] .alert').remove();
    			self.$('[name="login"]').button('loading');
    		},
    		success: function(xhr){
    			self.form('logout', xhr);
    		},
            error: function(xhr){
                self.$('form[login]').append('<div class="text-center alert alert-danger" style="margin: 10px -15px;"><div class="row">'+ xhr.responseText +'</div></div>');
            },
    		complete: function(){
    			self.$('[name="login"]').button('reset');
    		}
    	});
    },
    auth_logout: function(){
        var self = this;
        $.ajax({
            url: global.server_path + '/auth/logout',
            success: function(){
                self.form('login');
            },
            error: function(){
                alert("ada kesalahan di server, harap menghubungi admin");
            }
        })
    },
    form: function(file, data){
		var me = self;
		requirejs(['text!templates/header/'+file+'.html'],
		function(template){
            me.$('#header-menu-right').html(data ? _.template(template, data) : template);
		});
    }
  });
  return View;
});
