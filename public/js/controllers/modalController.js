app.controller("modalController", ["$scope", "$modalInstance", "title", "User", "Post", function($scope, $modalInstance, User, Post) {

	$scope.signupSubmit = function () {
		// password encryption here?? How do we save it?

		// Create user - no encryption on password yet!
		$scope.newUser = User.create({username: $scope.username, email: $scope.email, password: $scope.password}, function() {
			console.log("User created with id: " + $scope.newUser._id);
			$modalInstance.close("data form OK");
		});
	};

	$scope.loginSubmit = function () {
		//Run som SUBMIT LOGIN code here
		$modalInstance.close("data form OK");
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

	$scope.closeAddPost = function(type) {
		$modalInstance.close(type);
	};

}]);
