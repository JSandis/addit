//"addit" controller.
app.controller("userpageController", ["$http", "$scope", "userpageFactory", "User", "Post", function($http, $scope, userpageFactory, User, Post) {
	console.log("userpageController: I'm alive!");
	var currentUserId = "55c9d973c5b0e5e1aeec3e8c";
	var currentUser = User.get({_id: currentUserId});



	$scope.users = User.get(function() {
		if($scope.users.length === 0) {
			$scope.testuser = User.create({username: "testuser", email: "test@test.com", password: "CC03E747A6AFBBCBF8BE7668ACFEBEE5"}, function() {
				console.log("User created: "+$scope.testuser);
				/*$scope.testuser.$delete(function() {
					console.log("User is deleted");
				});*/
			});
		}
		/*for (var i = 0; i < $scope.users.length; i++) {
			$scope.users[i].$delete();
		}*/
	});

	$scope.posts = Post.get(function() {
		/*for (var i = 0; i < $scope.posts.length; i++) {
			$scope.posts[i].$delete();
		}*/
	});
	hehehe = $scope.posts;
	$scope.imagePostSubmit = function() {
		console.log("Submit event for post: working!!!");

		var imagePath = "";

		// only supporting single file upload ([0]) 
		// at the moment...
		console.log("image files: ", $scope.images);
		userpageFactory($scope.images[0]).success(function(data) {
			console.log("saved image file, public path: ", data);
			imagePath = data;
			var imageArray = [imagePath];
			var videoArray = ["videopath1", "videopath2"];

			var newPostId, newPost = Post.create(
				{
					content: $scope.content,
					images: imageArray,
					videos: videoArray
				}, function(data) {
					newPostId = data[0]._id;
					User.update({_relate:{items:currentUser,posts:newPost}});
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

	$scope.postSubmit = function() {
		var newPostId, newPost = Post.create(
			{
				content: $scope.content
			}, function(data) {
				newPostId = data[0]._id;
				User.update({_relate:{items:currentUser,posts:newPost}});
				console.log("d", {items:newPost,author:currentUser});
				Post.update({_relate:{items:newPost,author:currentUser}});
				console.log("Post created with id ", newPostId);
				$scope.$parent.posts.push(newPost[0]);
			}
		);
	}

}]);


