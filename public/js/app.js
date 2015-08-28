//app declaration and dependency injection
var app = angular.module("addit", ["ngRoute", "ngResource", 'ngFileUpload', "ui.bootstrap"]);

//app config
app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
  //route config
  $routeProvider
    .when("/addit/", {
      templateUrl: "partials/home.html",
      controller: "homeController"
    })
    .when("/addit/userpage/:op?", {
      templateUrl: "partials/userpage.html",
      controller: "userpageController"/*,
      login: true // the route is login protected*/
    })
    .otherwise({
      redirectTo: "/addit/"
    });

  $locationProvider.html5Mode(true);
}]);
