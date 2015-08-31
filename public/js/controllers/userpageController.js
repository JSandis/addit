//"addit" controller.
app.controller("userpageController", ["$http", "$scope", "User", "Post", "$modal", "$log", "$routeParams", "$location", "addPostFactory", "login", function($http, $scope, User, Post, $modal, $log, $routeParams, $location, addPostFactory, login) {
	console.log("userpageController: I'm alive!");

	$scope.user = login.user;

	/*var currentUserId = "55e3735eb4d241b019422c10";
	var currentUser = User.getById({_id: currentUserId}, function() {
	// console.log("c", currentUser);
	});*/
	// window.scope = $scope;

	/*$scope.users = User.get(function() {
		if($scope.users.length === 0) {
			$scope.testuser = User.create({username: "testuser", email: "test@test.com", password: "CC03E747A6AFBBCBF8BE7668ACFEBEE5"}, function() {
				console.log("User created: "+$scope.testuser);
			});
		}

		// Delete all users and its posts
		// for (var i = 0; i < $scope.users.length; i++) {
		//  // Delete user from db
		//	deleteUserAndItsPosts($scope.users[i]);
		// }
	});*/
	
	$scope.posts = Post.get({author: login.user._id});

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
		User.update({_id: login.user._id}, {posts: $scope.posts}, function(data) { //callback
			if (!data.status) {
				// Delete post from db
				post.$delete();
			}
		});

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
			console.log("Modal closed, and sent ", data);
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};

	if ($routeParams.op && $routeParams.op == 'add') {
		addPostFactory.openAddPost('Add Post', 'partials/addpost.html', 'modalController');
	}

}]);
