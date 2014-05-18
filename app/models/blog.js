// The contents of individual model .js files will be concatenated into dist/models.js

(function() {

// Protects views where AngularJS is not loaded from errors
if ( typeof angular == 'undefined' ) {
	return;
};


var module = angular.module('BlogModel', ['restangular']);

module.factory('BlogRestangular', function(Restangular) {

  return Restangular.withConfig(function(RestangularConfigurer) {

    RestangularConfigurer.setBaseUrl('http://ng-project-backend.herokuapp.com/api/');
    //RestangularConfigurer.setBaseUrl('http://localhost:3000/api/');
    RestangularConfigurer.setRequestSuffix('.json');
    RestangularConfigurer.setRestangularFields({
      id: "id"
    });
    RestangularConfigurer.setErrorInterceptor( function(response){
    	if ( response.status==401) {
    		var webView = new steroids.views.WebView("/views/blog/login.html");
    		steroids.modal.show(webView);	
    	}

    	return response;
    });

  });

});


})();
