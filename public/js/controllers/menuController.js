app.controller("menuController", ["$http", "$scope", "addPostFactory", function($http, $scope, addPostFactory) {
// app.controller("menuController", ["$http", "$scope", "addPostFactory", "login", function($http, $scope, addPostFactory, login) {
	console.log("The menuController is alive!");
	
	// $scope.user = login.user;

	$scope.isCollapsed = true;
	$scope.collapseNav = function() {
		$scope.isCollapsed = !$scope.isCollapsed;
		console.log("isCollapsed", $scope.isCollapsed);
	};

	/*$scope.addPost = function() {
		addPostFactory.openAddPost('Add Post', 'partials/addpost.html', 'modalController');
	};*/

	$scope.logOut = function() {
		var deletePost = confirm("Are you sure you want to log out?");
		if(deletePost) {
			// login.logout();
			// console.log("User was successfully logged out");
			console.log("User will be successfully logged out when implemented");
		} else {
			console.log("User was not logged out");
		}
	};

	$scope.$on("logout", function() {
		console.log("logout $broadcast detected");
		$location.url("/addit/");
	});
}]);
