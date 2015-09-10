//"addit" controller
app.controller("homeController", ["$http", "$scope", "login", "Post", "User", "IS_MOBILE", function($http, $scope, login, Post, User, IS_MOBILE) {
	// console.log("homeController: I'm alive!");
  var postsIndex = postsIndex || 0;
  var quantity = IS_MOBILE ? 5 : 0; //Testa om detta funkar först (lägg till is mobiel ocskå)
  $scope.quantity = quantity;
  console.log("IS_MOBILE", IS_MOBILE);

  $scope.users = User.get(function(data) {
    $scope.user = data;
    //$scope.posts = [];
    $scope.posts = Post.get({author: data._id, _populate:"author"}, function() {
      $scope.visiblePosts = $scope.posts.splice(postsIndex);
    });

      $scope.loadMore = function() {

    var counter = 0;
    $scope.loadMore = function() {
      for (var posts = 0; posts < 5; posts++) {
        //$scope.posts.push({posts:counter});
        counter += 10;
      }
    };

    $scope.loadMore();

  });

  $scope.changePage = function(forward) {
    var newPostsIndex = forward ? (postsIndex + quantity) : (postsIndex - quantity);

    if (newPostsIndex < 0 || newPostsIndex >= $scope.posts.length-1) { return; }

    $scope.visiblePosts = $scope.posts.splice(postsIndex);
  }

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
