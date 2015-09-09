//"addit" controller
app.controller("homeController", ["$http", "$scope", "login", "Post", "User", function($http, $scope, login, Post, User) {
	// console.log("homeController: I'm alive!");


  $scope.users = User.get(function(data) {
    $scope.user = data;
    $scope.posts = Post.get({author: data._id, _populate:"author"});

      //$scope.posts = [];
    window.scope = $scope;

      $scope.loadMore = function() {

        var last = $scope.posts[$scope.posts.length -1];
        for (var i = 1; i <= 5; i++) {

          $scope.posts.push(last + i);
        }

      };

    $scope.loadMore();

  });



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
