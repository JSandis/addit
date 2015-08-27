app.controller("modalController", ["$scope", "$modalInstance", "User", "Post", function($scope, $modalInstance, User, Post) {
	// window.scope = $scope;
	
	// a function to check if the username exists
	$scope.usernameExists = false;
	$scope.checkUsername = function() {
		if (!$scope.signupForm.username.$error.minlength) {
			User.get({username: $scope.newUser.username}, function(data) {
				console.log("$scope.newUser: ", $scope.newUser);
				if (!data.length) {
					$scope.usernameExists = false;
				} else {
					$scope.usernameExists = true;
				}
				console.log("username usernameExists ", $scope.usernameExists);
			});
		}
	};

	$scope.signupSubmit = function () {
		// password encryption here?? How do we save it?

		// Create user - no encryption on password yet!
		$scope.newUser = User.create($scope.newUser, function(data) {
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
