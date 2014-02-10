define([
	'text!../../templates/admin.html'],
	function(template){
		var View = Backbone.View.extend({
			el: 'body',
			render: function(){
				var self = this;
				$(this.el).html(template);
				requirejs(['views/contents/seluruhrumah'
               ], function(View){
               		var viewMenu = Vm.create(self, 'views_headers_menu', ViewMenu);
					viewMenu.render();

					collection.fetch({reset: true});
				})
			}
		});
		return View;
	});