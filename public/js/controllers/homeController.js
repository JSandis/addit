//"myAppName" controller.
app.controller("homeController", ["$http", "$scope", "Person", function($http, $scope,Person) {
  console.log("I'm alive!");
  Person.create({name:"Thompa",towelColor:"red",age:914});

  $scope.allPersons = Person.get();
}]);