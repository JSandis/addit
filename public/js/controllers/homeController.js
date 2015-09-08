//"addit" controller
app.controller("homeController", ["$http", "$scope", "login", "Post", "User", function($http, $scope, login, Post, User) {
	// console.log("homeController: I'm alive!");


  $scope.users = User.get(function(data) {
    $scope.user = data;
    $scope.posts = Post.get({author: data._id, _populate:"author"}); 

    //$scope.posts = [];
    
    var counter = 0;
    $scope.loadMore = function() {
    for (var posts = 0; posts < 5; posts++) {
        //$scope.posts.push({posts:counter});
        counter += 10;
    }
};

$scope.loadMore();  
});

  //   $scope.posts = Post.get({author: data._id, _populate:"author"});

    $scope.myInterval = -1;

  
    // var post.images = [];

    // for(var i = data.length; i < data.length; i++) {
    //     post.images.push(data[i].imagePath[data[i].imagePath.length]);
    // }
    // $scope.post.images = post.images;
  

  // $scope.slideIt = function () {
  //   var newWidth = 200 + slides.length + 1;
  //   slides.push({
  //       image: ''
  //   });
  // };
 
  // $scope.slideIt();

}]);
