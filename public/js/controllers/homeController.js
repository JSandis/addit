//"addit" controller
app.controller("homeController", ["$http", "$scope", "login", "Post", "User", function($http, $scope, login, Post, User) {
	// console.log("homeController: I'm alive!");


  $scope.users = User.get(function(data) {
    $scope.user = data;
    $scope.posts = Post.get({author: data._id, _populate:"author"});   

    $scope.totalposts=0;    
    $scope.startList = 0;
    $scope.stopLoadingData = false;

    $scope.more = function () {
        if (!$scope.stopLoadingData) {
            $scope.loading = true;
            $http.get($scope.posts, {"startList": $scope.startList}).success(function (data) {
                $scope.totalposts=data.totalposts;
                angular.forEach(data.posts,function (key) {
                    $scope.posts.push(key);                    
                });      
                $scope.stopLoadingData = ($scope.posts.length === $scope.totalposts);
                $scope.startList += 10;
            });
        };
        $scope.loading = false;
    };
    $scope.more();//twice execute-> controller:load and scroll:load
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
