app.controller( "signUpController", ["$http", "$scope", function( $http, $scope ) {
	console.log( "signUpController is up and running." );

	$scope.newUser = {
		username: "",
		password: "",
		email: ""
	};

	$scope.submit = function() {
		console.log( "new user is: ", $scope.newUser );
	}
}]);