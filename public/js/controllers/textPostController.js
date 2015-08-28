app.controller("textPostController", ["$scope", "$modalInstance", "title", "uploadFactory", "User", "Post", function($scope, $modalInstance, title, uploadFactory, User, Post) {

	$scope.title = title;
	$scope.post = [];

	var currentUserId = "55df0e220664eaf824a4618c";
	var currentUser = User.getById({_id: currentUserId});

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
				User.update({_relate:{items:currentUser,posts: newPost}});
				Post.update({_relate:{items:newPost,author: currentUser}});
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