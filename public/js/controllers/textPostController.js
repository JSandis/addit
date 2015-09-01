app.controller("textPostController", ["$scope", "$modalInstance", "title", "uploadFactory", "User", "Post", "login", function($scope, $modalInstance, title, uploadFactory, User, Post, login) {

	$scope.title = title;
	$scope.post = [];

	$scope.user = login.user;

	$scope.textPostSubmit = function() {
		var currentDate = new Date();

		var newPostId, newPost = Post.create(
		{
			content: $scope.post.content,
			createdAt: currentDate
		},
		function(data) {
			if (!data.status) {
				newPost = data[0];
				newPostId = newPost._id;
				console.log("Post created with id ", newPostId);
				login.getUser(function(usrObj) {
					usrObj.posts.push(newPostId);
					User.update({_id: login.user._id}, {posts: usrObj.posts}, function() {
						Post.update({_relate:{items: newPost, author: login.user}}, function() {
							$scope.content = "";
							$scope.successAlert = "DONE! Your post was successfully posted.";
							$modalInstance.close("data form OK");
						});
					});
				});
			} else {
				$scope.errorAlert = "OUCH! The post failed to be posted.";
			}
		});
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

}]);