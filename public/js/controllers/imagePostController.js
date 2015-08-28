app.controller("imagePostController", ["$scope", "$modalInstance", "title", "uploadFactory", "User", "Post", function($scope, $modalInstance, title, uploadFactory, User, Post) {

	$scope.title = title;
	$scope.post = [];

	var currentUserId = "55df0e220664eaf824a4618c";
	var currentUser = User.getById({_id: currentUserId});

	// image post upload & submit handler
	function uploadImage(file, callback) {
		uploadFactory(file).success(function(data) {
			$scope.imagePaths.push(data);
			console.log("saved image file, public path: ", data);
			console.log("imagePaths: ", $scope.imagePaths);
			callback();
		}).error(function(data) {
			//error alert for image upload
			$scope.errorAlert = "OUCH! the image did not upload.";
			// console.log("Error on upload: ", data);
		});
	}

	$scope.imagePostSubmit = function() {
		$scope.imagePaths = [];
		// console.log("image files: ", $scope.images);
		$scope.images.forEach(function(image, index) {
			var i = index;
			uploadImage($scope.images[i], function() {
				if (i === $scope.images.length -1) {
					var currentDate = new Date();
					var newPostId, newPost = Post.create(
					{
						content: $scope.content,
						images: $scope.imagePaths,
						createdAt: currentDate
					}, function(data) {
						if (!data.status){
							newPostId = data[0]._id;
							User.update({_relate:{items:currentUser,posts:newPost}});
							Post.update({_relate:{items:newPost,author:currentUser}});

							$scope.successAlert = "DONE! Your post was successfully posted.";
							$scope.content = "";
							// console.log("content: ", $scope.content);
							// $scope.imagePaths = [];
							document.getElementById('images').value = null;

							$modalInstance.close("data form OK");
						} else {
							// error alert
							$scope.errorAlert = "OUCH! The post failed to be posted.";
						}
					});
				}
			});
		});
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

}]);