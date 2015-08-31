app.controller("textPostController", ["$scope", "$modalInstance", "title", "uploadFactory", "User", "Post", "login", function($scope, $modalInstance, title, uploadFactory, User, Post, login) {

	$scope.title = title;
	$scope.post = [];

	$scope.user = login.user;

	/*var currentUserId = "55e3735eb4d241b019422c10";
	var currentUser = User.getById({_id: currentUserId});*/

	$scope.textPostSubmit = function() {
		var currentDate = new Date();

		var newPostId, newPost = Post.create(
		{
			content: $scope.post.content,
			createdAt: currentDate
		},
		function(data) {
			if (!data.status) {
				newPostId = data[0]._id;
				User.update({_relate:{items: login.user, posts: newPost}});
				Post.update({_relate:{items: newPost, author: login.user}});
				console.log("Post created with id ", newPostId);

				$scope.content = "";
				$scope.successAlert = "DONE! Your post was successfully posted.";
				$modalInstance.close("data form OK");
			} else {
				$scope.errorAlert = "OUCH! The post failed to be posted.";
			}
		});
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

}]);