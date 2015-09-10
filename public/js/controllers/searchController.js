app.controller('searchController', ["$http", "$scope","$location","$rootScope", "Post","User", function($http,$scope,$location,$rootScope, Post, User){

	$scope.isCollapsed = true;
	$scope.SearchError = false;

	$scope.searchSubmit = function(){
		// get the posts that matches the string in the search bar
		Post.get({_all: new RegExp($scope.searchString,"i"), _populate:"author"}, function(data){
			if(data.length && $scope.searchString){

				console.log("FOUND:",data);
				$rootScope.searchResult = data;
				// change location to /search
				$location.url("/search");
				$scope.SearchError = false;
			}else if(!$scope.searchString){
				$scope.SearchError = true;
			}else{
				// change location to /search
				$location.url("/search");
				console.log("OBS!!! No data found...");
				$rootScope.searchResult = data;
				// change location to /search
				$location.url("/search");
			}
		});
	};

	$scope.searchForPostFromTag = function(tag) {
		// get the posts that matches the tag that the user clicked on
		Post.get({tags: new RegExp(tag,"i"), _populate:"author"}, function(data){
			
			$rootScope.searchResult = data;

			if(data.length && tag){
				console.log("FOUND:",data);
				// change location to /search
				$location.url("/search");
			}else{
				console.log("OBS!!! No data found...");
				// change location to /search
				$location.url("/search");
			}
		});
	};

}]);
