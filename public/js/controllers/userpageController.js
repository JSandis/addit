//"addit" controller.
app.controller("userpageController", ["$http", "$scope", "userpageFactory", "User", "Post", function($http, $scope, userpageFactory, User, Post) {
	console.log("userpageController: I'm alive!");
	var currentUserId = "55c9d973c5b0e5e1aeec3e8c";
	var currentUser = User.get({_id: currentUserId});


	$scope.users = User.get(function() {
		if($scope.users.length === 0) {
			$scope.testuser = User.create({username: "testuser", email: "test@test.com", password: "CC03E747A6AFBBCBF8BE7668ACFEBEE5"}, function() {
				console.log("User created: "+$scope.testuser);
			});
		}

		// Delete all users and its posts
		/*for (var i = 0; i < $scope.users.length; i++) {
			// Delete user from db
			deleteUserAndItsPosts($scope.users[i]);
		}*/
	});

	$scope.posts = Post.get({author: currentUserId});

	// Delete all posts from all users and update the users posts
	/*$scope.posts = Post.get(function() {
		for (var i = 0; i < $scope.posts.length; i++) {
			deletePostAndUpdateUserPosts($scope.posts[i]);
		}
	});*/

	function deleteUserAndItsPosts(user) {
		var posts = Post.get({author: user._id}, function() {
			console.log("userPosts: ", posts);
			//Loop through posts and delete
			for (var i = 0; i < posts.length; i++) {
				posts[i].$delete();
			}
		});
		user.$delete();
		console.log("User is deleted");
	}

	function deletePostAndUpdateUserPosts(post) {
		// Remove the element from the array
		var index = $scope.posts.indexOf(post);
		$scope.posts.splice(index, 1);
		// Update the user's posts (with the posts that are not deleted - if any)
		User.update({_id: currentUserId}, {posts: $scope.posts});
		// Delete post from db
		post.$delete();
	}

	// image post upload & submit handler
	$scope.imagePaths = [];
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
		// console.log("image files: ", $scope.images);

		$scope.images.forEach(function(image, index) {
			var i = index;
			uploadImage($scope.images[i], function() {
				if (i === $scope.images.length -1) {
					var newPostId, newPost = Post.create(
						{
							content: $scope.content,
							images: $scope.imagePaths
						}, function(data) {
							if (!data.status){
								newPostId = data[0]._id;
								User.update({_relate:{items:currentUser,posts:newPost}});
								Post.update({_relate:{items:newPost,author:currentUser}});
								console.log("Post created with id ", newPostId);
								$scope.$parent.posts.push(newPost[0]);
								console.log("imagePaths: ", $scope.imagePaths);
								// success alert
								$scope.successAlert = "DONE! the post successfully saved in DB.";
							}else{
								// error alert
								$scope.errorAlert = "OUCH! the post failed to save in DB.";
							}
						}
					);
				}
			});
		});
	};

	// Video post upload & submit handler
	$scope.videoPaths = [];
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
		//var videoPath = "";
		$scope.videos.forEach(function(video, index) {
			var i = index;
			uploadVideo($scope.videos[i], function() {
				if (i === $scope.videos.length -1) {
					var newPostId, newPost = Post.create(
						{
							content: $scope.content,
							videos: $scope.videoPaths
						}, function(data) {
								if(!data.status){
									newPostId = data[0]._id;
									User.update({_relate:{items:currentUser,posts:newPost}});
									console.log("d", {items:newPost,author:currentUser});
									Post.update({_relate:{items:newPost,author:currentUser}});
									console.log("Post created with id ", newPostId);
									$scope.$parent.posts.push(newPost[0]);
									// success alert
									$scope.successAlert = "DONE! the post successfully saved in DB.";
								}else {
									// success alert
									$scope.errorAlert = "OUCH! the post failed to save in DB.";
								}
							}
					);
				}
			});
		});
			//var videoArray = [videoPath];

	};

	$scope.textpostSubmit = function() {

		var newPostId, newPost = Post.create(
			{
				content: $scope.content
			},
			function(data) {
				if (!data.status) {
					newPostId = data[0]._id;
					User.update({_relate:{items:currentUser,posts:newPost}});
					Post.update({_relate:{items:newPost,author:currentUser}});
					console.log("Post created with id ", newPostId);
					$scope.$parent.posts.push(newPost[0]);

					$scope.successAlert = "DONE! the post successfully saved in DB.";
				} else {
					$scope.errorAlert = "OUCH! the post failed to save in DB.";
				}
			}
		);
	};

	$scope.deletePost = function(post) {
		var deletePost = confirm("Are you sure you want to delete the post?");
		if(deletePost) {
			deletePostAndUpdateUserPosts(post);
			console.log("Post was successfully deleted");
		} else {
			console.log("Post was not deleted");
		}
	};

	$scope.editPost = function() {
		console.log("Edit post");
	};

}]);


