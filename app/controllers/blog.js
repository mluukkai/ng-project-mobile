var blogApp = angular.module('blogApp', ['BlogModel', 'ngTouch', 'restangular']);


// Index: http://localhost/views/blog/index.html

blogApp.controller('IndexCtrl', function ($scope, BlogRestangular) {
  $scope.showModal = function () {
    var webView = new steroids.views.WebView("/views/blog/modal.html");
    steroids.modal.show(webView);
  }

  // Helper function for opening new webviews
  $scope.open = function(id) {
    webView = new steroids.views.WebView("/views/blog/show.html?id="+id);
    steroids.layers.push(webView);
  };

  $scope.blog = { user:'mluukkai', subject:'koe', body:'koe'};

  $scope.createBlog = function(){
    BlogRestangular.all('blogs').post($scope.blog).then(function(data){
      $scope.blogs.push(data);
    });
    $scope.blog = {};
    $scope.vis = false;
  }

  // Fetch all objects from the local JSON (see app/models/blog.js)
  BlogRestangular.all('blogs').getList().then( function(blogs) {
    $scope.blogs = blogs;
  });

  // Native navigation
  steroids.view.navigationBar.show("Blg entries");
  steroids.view.setBackgroundColor("#FFFFFF");

});


// Show: http://localhost/views/blog/show.html?id=<id>

blogApp.controller('ShowCtrl', function ($scope, $filter, BlogRestangular) {
  var id = steroids.view.params['id'];

  BlogRestangular.one('blogs', id).get().then( function(blog) {
    $scope.blog = blog;
    steroids.view.navigationBar.show(blog.subject);
  });

  $scope.delete = function(){
    $scope.blog.remove();
  }

  // Native navigation
  steroids.view.setBackgroundColor("#FFFFFF");

});


blogApp.controller('ModalCtrl', function ($scope,  BlogRestangular, $timeout) {
  $scope.blog = { user:'mluukkai', subject:'koe', body:'koe'};

  $scope.hide = function () {
    steroids.modal.hide();
  }

  $scope.createBlog = function () {
    BlogRestangular.all('blogs').post($scope.blog).then(function(data){
    $scope.flash = true;
    $scope.new = data;
      $timeout( function() {
        steroids.modal.hide();
      }, 3000)
    });
  }

  // Native navigation
  steroids.view.setBackgroundColor("#FFFFFF");

});


blogApp.controller('LoginCtrl', function ($scope, $http) {
  $scope.hide = function () {
    steroids.modal.hide();
  }

  $scope.login = function () {
    var URL = 'http://ng-project-backend.herokuapp.com/session';
    //var URL = 'http://localhost:3000/session'; 
    $http.post(URL, $scope.credentials).then( function(data){
      console.log( data.data);
      alert(data.data);
    });
    $scope.credentials = {}
  }

  // Native navigation
  steroids.view.setBackgroundColor("#FFFFFF");

});
