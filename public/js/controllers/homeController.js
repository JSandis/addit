//"addit" controller
app.controller("homeController", ["$http", "$scope", "login", "Post", "User", function($http, $scope, login, Post, User) {
	// console.log("homeController: I'm alive!");

  $scope.users = User.get();

  $scope.posts = Post.get();

}]);
