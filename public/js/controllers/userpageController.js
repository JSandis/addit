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

	$scope.posts = Post.get(function() {
		// Delete all posts from current user and update user's posts
		/*for (var i = 0; i < $scope.posts.length; i++) {
			deletePostAndUpdateUserPosts($scope.posts[i], currentUserId);
		}*/
	});

	function deleteUserAndItsPosts(user) {
		deleteAllPostsFromAuthor(user._id);
		user.$delete();
		console.log("User is deleted");
	}

	function deleteAllPostsFromAuthor(authorId) {
		var posts = Post.get({author: authorId}, function() {
			console.log("userPosts: ", posts);
			//Loop through posts and delete
			for (var i = 0; i < posts.length; i++) {
				posts[i].$delete();
			}
		});
	}

	function deletePostAndUpdateUserPosts(post, userId) {
		var usersPosts = Post.get({author: userId});
		// Remove the element from the array
		var index = usersPosts.indexOf(post);
		usersPosts.splice(index, 1);
		// Update the user's posts (with the posts that are not deleted - if any)
		User.update({_id: currentUserId}, {posts: usersPosts});
		// Delete post from db
		post.$delete();
	}

	function uploadImage(file) {
		userpageFactory(file).success(function(data) {
			$scope.imagePaths.push(data);
			console.log("saved image file, public path: ", data);
			console.log("imagePaths: ", $scope.imagePaths);
		}).error(function(data) {
			//file failed to upload
			console.log("Error on upload: ", data);
		});
	}

	$scope.imagePostSubmit = function() {
		$scope.imagePaths = [];

		// only supporting single file upload ([0]) 
		// at the moment...
		console.log("image files: ", $scope.images);

		for (var i = 0; i < $scope.images.length; i++) {
			uploadImage($scope.images[i]);
		}

		var newPostId, newPost = Post.create(
			{
				content: $scope.content,
				images: $scope.imagePaths
			}, function(data) {
				newPostId = data[0]._id;
				User.update({_relate:{items:currentUser,posts:newPost}});
				Post.update({_relate:{items:newPost,author:currentUser}});
				console.log("Post created with id ", newPostId);
				$scope.$parent.posts.push(newPost[0]);
				console.log("imagePaths: ", $scope.imagePaths);
			}
		);
	};

	// vidoepostSubmit handler
	$scope.videoPostSubmit = function() {
		console.log("Submit event for post: working!!!");

		var videoPath = "";

		// only supporting single file upload ([0]) 
		// at the moment...
		console.log("video files: ", $scope.videos);
		userpageFactory($scope.videos[0]).success(function(data) {
			console.log("saved video file, public path: ", data);
			videoPath = data;
			var videoArray = [videoPath];

			var newPostId, newPost = Post.create(
				{
					content: $scope.content,
					videos: videoArray
				}, function(data) {
					newPostId = data[0]._id;
					User.update({_relate:{items:currentUser,posts:newPost}});
					console.log("d", {items:newPost,author:currentUser});
					Post.update({_relate:{items:newPost,author:currentUser}});
					console.log("Post created with id ", newPostId);
					$scope.$parent.posts.push(newPost[0]);
				}
			);
		}).error(function(data) {
			//file failed to upload
			console.log("Error on upload: ", data);
		});
	};

	$scope.textpostSubmit = function() {
		var newPostId, newPost = Post.create(
			{
				content: $scope.content
			}, function(data) {
				newPostId = data[0]._id;
				User.update({_relate:{items:currentUser,posts:newPost}});
				Post.update({_relate:{items:newPost,author:currentUser}});
				console.log("Post created with id ", newPostId);
				$scope.$parent.posts.push(newPost[0]);
			}

		);
	};

	$scope.deletePost = function() {

	};

	$scope.editPost = function() {

	};

}]);


