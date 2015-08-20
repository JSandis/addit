app.controller("modalController", ["$scope", "$modalInstance", "userpageFactory", "User", "Post", function($scope, $modalInstance, userpageFactory, User, Post) {
	var currentUserId = "55cc66f15f19a87c39aaaaf4";
	var currentUser = User.getById({_id: currentUserId});

	$scope.signupSubmit = function () {
		// run some signup code
		$modalInstance.close("data from OK");
	};

	$scope.loginSubmit = function () {
		//Run som SUBMIT LOGIN code here
		$modalInstance.close("data form OK");
	};

	// image post upload & submit handler
	function uploadImage(file, callback) {
		userpageFactory(file).success(function(data) {
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
							console.log("Post created with id ", newPostId);
							console.log(data);
							//$scope.$parent.posts.push(newPost[0]);
							console.log("imagePaths: ", $scope.imagePaths);

							// console.log("imagePaths: ", $scope.imagePaths);
							// success alert

							$scope.successAlert = "DONE! the post successfully saved in DB.";
							$scope.content = "";
							// console.log("content: ", $scope.content);
							// $scope.imagePaths = [];
							document.getElementById('images').value = null;

							$modalInstance.close("data from OK");
						}else{
							// error alert
							$scope.errorAlert = "OUCH! the post failed to save in DB.";
						}
					});
				}
			});
		});
	};

	// Video post upload
	function uploadVideo(file, callback) {
		userpageFactory(file).success(function(data) {
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
							console.log("d", {items:newPost,author:currentUser});
							Post.update({_relate:{items:newPost,author:currentUser}});
							console.log("Post created with id ", newPostId);
							//$scope.$parent.posts.push(newPost[0]);
							console.log("videoPaths: ", $scope.videoPaths);
							$scope.content = "";
							// console.log("content: ", $scope.content);
							// $scope.videoPaths = [];
							document.getElementById('videos').value = null;
							// console.log("videoPaths: ", $scope.videoPaths);
							// success alert
							$scope.successAlert = "DONE! the post successfully saved in DB.";
							$modalInstance.close("data from OK");
						}else {
							// success alert
							$scope.errorAlert = "OUCH! the post failed to save in DB.";
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
			content: $scope.content,
			createdAt: currentDate
		},
		function(data) {
			if (!data.status) {
				newPostId = data[0]._id;
				User.update({_relate:{items:currentUser,posts:newPost}});
				Post.update({_relate:{items:newPost,author:currentUser}});
				console.log("Post created with id ", newPostId);
				//$scope.$parent.posts.push(newPost[0]);
				$scope.content = "";
				$scope.successAlert = "DONE! the post successfully saved in DB.";
				$modalInstance.close("data from OK");
			} else {
				$scope.errorAlert = "OUCH! the post failed to save in DB.";
			}
		});
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

}]);
