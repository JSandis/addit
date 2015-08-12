//"addit" controller.
app.controller("userpageController", ["$http", "$scope", "userpageFactory", "User", "Post", function($http, $scope, userpageFactory, User, Post) {
	console.log("userpageController: I'm alive!");

	$scope.allUsers = User.get(function() {
		if($scope.allUsers.length === 0) {
			$scope.testuser = User.create({username: "testuser", email: "test@test.com", password: "CC03E747A6AFBBCBF8BE7668ACFEBEE5"}, function() {
				console.log("User created: "+$scope.testuser);
				/*$scope.testuser.$delete(function() {
					console.log("User is deleted");
				});*/
			});
		}
		/*for (var i = 0; i < $scope.allUsers.length; i++) {
			$scope.allUsers[i].$delete();
		}*/
	});

	$scope.allPosts = Post.get(function() {
		/*for (var i = 0; i < $scope.allPosts.length; i++) {
			$scope.allPosts[i].$delete();
		}*/
	});
	
	$scope.submit = function() {
		console.log("Submit event for post: working!!!");

		var currentUserId = "55ca0e9610899bfc2d2f12a4";
		var currentUser = User.get({_id: currentUserId});
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
					console.log("Post created with id "+newPostId);
				}
			);
		}).error(function(data) {
			//file failed to upload
			console.log("Error on upload: ", data);
		});
	};

}]);
