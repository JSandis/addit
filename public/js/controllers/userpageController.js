//"addit" controller.
app.controller("userpageController", ["$http", "$scope", function($http, $scope) {
	console.log("userpageController: I'm alive!");

	$scope.submit = function() {
		console.log("Submit event for post: working!!!");
	};

}]);