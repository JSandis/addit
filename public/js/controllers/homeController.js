//"addit" controller
app.controller("homeController", ["$http", "$scope", "Person", function($http, $scope,Person) {
	console.log("homeController: I'm alive!");

	/*$scope.thompa = Person.create({name:"Thompa",towelColor:"red",age:914}, function() {

		//$scope.thompa.$delete();
		$scope.allPersons = Person.get(function() {
			$scope.allPersons[0].$delete(function(){
				console.log("delete");
			});
		});
	});*/
	$scope.allPersons = Person.get();
}]);