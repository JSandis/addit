app.controller("modalController", ["$scope", "$modalInstance", "User", "Post", function($scope, $modalInstance, User, Post) {
	// window.scope = $scope;
	
	// a function to check if the username exists
	$scope.usernameExists = false;
	$scope.checkUsername = function() {
		if (!$scope.signupForm.username.$error.minlength) {
			User.get({username: $scope.newUser.username}, function(data) {
				if (!data.length) {
					$scope.usernameExists = false;
				} else {
					$scope.usernameExists = true;
				}
				console.log("username usernameExists ", $scope.usernameExists);
			});
		}
	};

	// sign up submit handler
	$scope.signupSubmit = function () {
		// password encryption here?? How do we save it?

		// Create user - no encryption on password yet!
		var newUserId, newUser = User.create($scope.newUser,
			function(data) {
				if (!data.status){
					newUserId = data[0]._id;
					$scope.newUser = newUser;
					console.log("User created with id: " + newUserId);
					console.log( "new user is: ", $scope.newUser );
					$scope.signupSuccessMsg = "You have now successfully registered!";
				}else{
					$scope.signupErrorMsg = "Oj! Failed to register.";
				}
			}
		);
	};

	$scope.signupSuccessClose = function() {
		$modalInstance.close("data form OK");
	};

	$scope.loginSubmit = function () {
		console.log("login submit: ", $scope.loginCredentials);
		/*login.login($scope.loginCredentials, function(data) {
			if (login.user._id) {
				$modalInstance.close("data form OK");
				$location.url('/userpage');
				console.log("User is now logged in");
				//some success message for user
			} else {
				console.log("User's login credentials are bad");
				//some error message for user
			}
		});*/
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

	$scope.closeAddPost = function(type) {
		$modalInstance.close(type);
	};

}]);
