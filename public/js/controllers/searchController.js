app.controller('searchController', ["$http", "$scope","$location","$rootScope", "Post","User", function($http,$scope,$location,$rootScope, Post, User){

	$scope.isCollapsed = true;
	$scope.SearchError = false;

  $scope.searchSubmit = function(){
		console.log( "searchController is up and running.");
		console.log( "The RegExp: ",new RegExp($scope.searchString,"i"));


		// get the posts that matches the string in the search bar
		Post.get({_all: new RegExp($scope.searchString,"i"), _populate:"author"}, function(data){
			if(data.length && $scope.searchString){

				console.log("FOUND:",data);
				$rootScope.searchResult = data;
				// change location to /search
				$location.url("/search");
			}else if(!$scope.searchString){
				$scope.SearchError = true;
			}else{
				// change location to /search
				$location.url("/search");
				console.log("OBS!!! No data found...");
			}
		});
		
	};

}]);