app.controller("editPostController", ["$scope", "$modalInstance", "title", "post", "User", "Post", function($scope, $modalInstance, title, post, User, Post) {
	$scope.title = title;
	$scope.post = post;

	$scope.textPostSubmit = function () {
		var currentDate = new Date();

		$scope.post = Post.update({_id: $scope.post._id},{content: $scope.post.content, updatedAt: currentDate}, function(data) {
			if (!data.status) {
				$scope.successAlert = "DONE! Your post was successfully updated.";
				$modalInstance.close("data form OK");
			} else {
				$scope.errorAlert = "OUCH! The post failed to be updated.";
			}
		});
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

}]);