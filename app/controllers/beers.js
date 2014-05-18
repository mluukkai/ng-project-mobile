var beersApp = angular.module('beersApp', ['BeersModel', 'ngTouch']);


// Index: http://localhost/views/beers/index.html

beersApp.controller('IndexCtrl', function ($scope, BeersRestangular) {

  // Helper function for opening new webviews
  $scope.open = function(id) {
    webView = new steroids.views.WebView("/views/beers/show.html?id="+id);
    steroids.layers.push(webView);
  };

  // Fetch all objects from the local JSON (see app/models/beers.js)
  BeersRestangular.all('beers').getList().then( function(beerss) {
    $scope.beerss = beerss;
  });

  // Native navigation
  steroids.view.navigationBar.show("Beers index");
  steroids.view.setBackgroundColor("#FFFFFF");

});


// Show: http://localhost/views/beers/show.html?id=<id>

beersApp.controller('ShowCtrl', function ($scope, $filter, BeersRestangular) {

  // Fetch all objects from the local JSON (see app/models/beers.js)
  BeersRestangular.all('beers').getList().then( function(beerss) {
    // Then select the one based on the view's id query parameter
    $scope.beers = $filter('filter')(beerss, {id: steroids.view.params['id']})[0];
  });

  // Native navigation
  steroids.view.navigationBar.show("Beers: " + steroids.view.params.id );
  steroids.view.setBackgroundColor("#FFFFFF");

});
