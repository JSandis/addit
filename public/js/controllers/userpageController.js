//"addit" controller.
app.controller("userpageController", ["$http", "$scope", "User", "Post", "$modal", "$log", function($http, $scope, User, Post, $modal, $log) {
	console.log("userpageController: I'm alive!");
	var currentUserId = "55cb8d05f62833e32a819b43";
	var currentUser = User.getById({_id: currentUserId}, function() {
		//console.log("c", currentUser);
	});

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

	$scope.deletePost = function(post) {
		var deletePost = confirm("Are you sure you want to delete the post?");
		if(deletePost) {
			deletePostAndUpdateUserPosts(post);
			console.log("Post was successfully deleted");
		} else {
			console.log("Post was not deleted");
		}
	};

	$scope.openEditPost = function(post, size) {
		
		var modalInstance = $modal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'partials/textpost.html',
			controller: 'editPostController',
			size: size,
			resolve: {
				title: function() {
					return "Edit Post";
				},
				post: function() {
					return post;
				}
			}
		});

		modalInstance.result.then(function (data) {
			/*$scope.posts = Post.get({author: currentUserId});*/
			console.log("Modal closed, and sent ", data);
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};


//     $scope.selected = 0;

//     $scope.select= function($index) {
//     $scope.selected = $index; 
// };

	$scope.openAddPost = function (size) {

		var modalInstance = $modal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'partials/addpost.html',
			controller: 'modalController',
			size: size,
			resolve: {
				title: function() {
					return "Add Post";
				}
			}
		});

		modalInstance.result.then(function (type) {
			if(type == "image") {
				$scope.openImagePost();
			} else if(type == "video") {
				$scope.openVideoPost();
			} else if(type == "text") {
				$scope.openTextPost();
			}
			console.log("Modal closed");
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};

	$scope.openImagePost = function (size) {

		var modalInstance = $modal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'partials/imagepost.html',
			controller: 'modalController',
			size: size,
			resolve: {
				title: function() {
					return "Add Image Post";
				}
			}
		});

		modalInstance.result.then(function (data) {
			$scope.posts = Post.get({author: currentUserId});
			location.reload(); // ugly fix for now
			console.log("Modal closed, and sent ", data);
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};

	$scope.openVideoPost = function (size) {

		var modalInstance = $modal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'partials/videopost.html',
			controller: 'modalController',
			size: size,
			resolve: {
				title: function() {
					return "Add Video Post";
				}
			}
		});

		modalInstance.result.then(function (data) {
			$scope.posts = Post.get({author: currentUserId});
			location.reload(); // ugly fix for now
			console.log("Modal closed, and sent ", data);
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};

	$scope.openTextPost = function (size) {

		var modalInstance = $modal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'partials/textpost.html',
			controller: 'modalController',
			size: size,
			resolve: {
				title: function() {
					return "Add Text Post";
				}
			}
		});

		modalInstance.result.then(function (data) {
			$scope.posts = Post.get({author: currentUserId});
			location.reload(); // ugly fix for now
			console.log("Modal closed, and sent ", data);
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};

}]);
