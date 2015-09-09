//app declaration and dependency injection
var app = angular.module("addit", ["ngRoute", "ngResource", "ngAnimate", "ngFileUpload", "ui.bootstrap", "ngTagsInput"]);

//app config
app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
  //route config
  $routeProvider
    .when("/", {
      templateUrl: "partials/home.html",
      controller: "homeController"
    })
    .when("/userpage/:op?", {
      templateUrl: "partials/userpage.html",
      controller: "userpageController",
      login: true // the route is login protected
    })
    .when( "/search" , {
      templateUrl: "partials/searchresult.html",
      controller: "searchController",
      // login: true
    })
    .otherwise({
      redirectTo: "/"
    });

  $locationProvider.html5Mode(true);
}]);
