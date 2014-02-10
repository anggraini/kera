define([
	'jquery',
	'backbone',
	'vm',
	'events',
	'text!templates/layout.html'],
	function($, Backbone, Vm, Events, template){
		var View = Backbone.View.extend({
			el: 'body',
			render: function(){
				var self = this;
				$(this.el).html(template);
				requirejs(['collections/contents/rumah',
               	'views/contents/rumah', 
               	'views/headers/menu',
  			   	'jquery_panzoom'
               ], function(Collection, View, ViewMenu){
               		var viewMenu = Vm.create(self, 'views_headers_menu', ViewMenu);
					viewMenu.render();

               		var collection = new Collection();
					var view = Vm.create(self, 'views_contents_rumah', View, {collection: collection});
					view.render();

					view.$('#svg-rumah').panzoom({
						$zoomRange: $('input[type="range"]')
					}).panzoom('option',{
						cursor: 'default'
					});
					collection.fetch({reset: true});
				})
			}
		});
		return View;
	});