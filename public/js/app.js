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
    .when("/addit/userpage/", {
      templateUrl: "partials/userpage.html",
      controller: "userpageController"
    })
    .when("/addit/signup/", {
      templateUrl: "partials/signup.html",
      controller: "signUpController"
    })
    .when("/addit/login/", {
      templateUrl: "partials/login.html",
      controller: "loginController"
    })
    .otherwise({
      redirectTo: "/addit/"
    });

  $locationProvider.html5Mode(true);
}]);