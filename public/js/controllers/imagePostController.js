app.controller("imagePostController", ["$scope", "$modalInstance", "title", "uploadFactory", "User", "Post", "login", function($scope, $modalInstance, title, uploadFactory, User, Post, login) {

	$scope.title = title;
	$scope.post = [];

	$scope.user = login.user;

	/*var currentUserId = "55e3735eb4d241b019422c10";
	var currentUser = User.getById({_id: currentUserId});*/

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
							User.update({_relate:{items: login.user, posts: newPost}});
							Post.update({_relate:{items: newPost, author: login.user}});

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