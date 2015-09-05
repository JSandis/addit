//app declaration and dependency injection
var app = angular.module("addit", ["ngRoute", "ngResource", "ngAnimate", "ngFileUpload", "ui.bootstrap"]);

//app config
app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
  //route config
  $routeProvider
    .when("/", {
      templateUrl: "partials/home.html",
      controller: "homeController"
    })
    .when( "/search" , {
      templateUrl: "partials/searchpage.html",
      controller: "searchController"
    })
    .when( "/userpage/search/" , {
      templateUrl: "partials/searchpage.html",
      controller: "searchController"
    })
    .when("/userpage/:op?", {
      templateUrl: "partials/userpage.html",
      controller: "userpageController",
      login: true // the route is login protected
    })
    .otherwise({
      redirectTo: "/"
    });

  $locationProvider.html5Mode(true);
}]);
