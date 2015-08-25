	var currentUserId = "55cb8d05f62833e32a819b43";
app.controller("modalController", ["$scope", "$modalInstance", "title", "uploadFactory", "User", "Post", function($scope, $modalInstance, title, uploadFactory, User, Post) {
	
	$scope.title = title;
	$scope.post = [];
	var currentUser = User.getById({_id: currentUserId});

	$scope.signupSubmit = function () {
		// password encryption here?? How do we save it?

		// Create user - no encryption on password yet!
		$scope.newUser = User.create({username: $scope.username, email: $scope.email, password: $scope.password}, function() {
			console.log("User created with id: " + $scope.newUser._id);
			$modalInstance.close("data form OK");
		});
	};

	$scope.loginSubmit = function () {
		//Run som SUBMIT LOGIN code here
		$modalInstance.close("data form OK");
	};

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
						}else{
							// error alert
							$scope.errorAlert = "OUCH! The post failed to be posted.";
						}
					});
				}
			});
		});
	};

	// Video post upload
	function uploadVideo(file, callback) {
		uploadFactory(file).success(function(data) {
			console.log("saved video file, public path: ", data);
			//videoPath = data;
			$scope.videoPaths.push(data);
			callback();
			// success alert for image upload
			//$scope.successAlert = "DONE! the video successfully uploaded.";
		}).error(function(data) {
			//error alert for video upload
			$scope.errorAlert = "OUCH! the video did not upload.";

			console.log("Error on upload: ", data);
		});
	}

	// vidoepostSubmit handler
	$scope.videoPostSubmit = function() {
		console.log("Submit event for post: working!!!");

		$scope.videoPaths = [];

		$scope.videos.forEach(function(video, index) {
			var i = index;
			uploadVideo($scope.videos[i], function() {
				if (i === $scope.videos.length -1) {
					var currentDate = new Date();
					var newPostId, newPost = Post.create(
					{
						content: $scope.content,
						videos: $scope.videoPaths,
						createdAt: currentDate
					}, function(data) {
						if(!data.status){
							newPostId = data[0]._id;
							User.update({_relate:{items:currentUser,posts:newPost}});
							Post.update({_relate:{items:newPost,author:currentUser}});

							console.log("Post created with id ", newPostId);
							console.log("videoPaths: ", $scope.videoPaths);
							
							$scope.content = "";
							document.getElementById('videos').value = null;
							$scope.successAlert = "Your post was successfully posted.";
							$modalInstance.close("data form OK");
						}else {
							// success alert
							$scope.errorAlert = "OUCH! The post failed to be posted.";
						}
					});
				}
			});
		});
	//var videoArray = [videoPath];
	};

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

	$scope.closeAddPost = function(type) {
		$modalInstance.close(type);
	};

}]);
