app.controller('searchController', ["$http", "$scope","$location","$rootScope", "Post","User", function($http,$scope,$location,$rootScope, Post, User){

	$scope.isCollapsed = true;


  $scope.searchSubmit = function(){
		console.log( "searchController is up and running.");
		console.log( "The RegExp: ",new RegExp($scope.searchString,"i"));


		// get the posts that matches the string in the search bar
		Post.get({_all: new RegExp($scope.searchString,"i"), _populate:"author"}, function(data){
			if(data.length){

				console.log("FOUND:",data);
				$rootScope.searchResult = data;
				// change location to /search
				$location.url("/search");
			}else{
				console.log("OBS!!! No data found...");
			}
		});

		// ** Ex. on HTML to show the serch result **
		// <ul>
		//	<li ng-repeat="i in searchResult">
		//		<p>{{i.content}}</p>
		//	</li>
		// </ul>

	};

}]);