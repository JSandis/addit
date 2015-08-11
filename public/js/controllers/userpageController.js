//"addit" controller.
app.controller("userpageController", ["$http", "$scope", "userpageFactory", "User", "Post", function($http, $scope, userpageFactory, User, Post) {
	console.log("userpageController: I'm alive!");

	$scope.allUsers = User.get(function() {
		console.log("How many users: "+$scope.allUsers.length);
		if($scope.allUsers.length === 0) {
			$scope.testuser = User.create({username: "testuser", email: "test@test.com", password: "CC03E747A6AFBBCBF8BE7668ACFEBEE5"}, function() {
				console.log("User created: "+$scope.testuser);
				/*$scope.testuser.$delete(function() {
					console.log("User is deleted");
				});*/
			});
		}
		/*for (var i = 0; i < $scope.allUsers.length; i++) {
			$scope.allUsers[i].$delete();
		}*/
	});
	
	
	$scope.submit = function() {
		console.log("Submit event for post: working!!!");
		console.log("files: ", $scope.files);
    // only supporting single file upload ([0]) 
    // at the moment...
    userpageFactory($scope.files[0]).success(function(data) {
    console.log("saved file, public path: ", data);
    });
	};

}]);