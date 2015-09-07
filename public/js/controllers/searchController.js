app.controller('searchController', ["$http", "$scope","$location","$rootScope", "Post", function($http,$scope,$location,$rootScope, Post){

	
  $scope.searchSubmit = function(){
		console.log( "searchController is up and running.");
		console.log( "The RegExp: ",new RegExp($scope.searchString,"i"));


		// get the posts that matches the string in the search bar
		Post.get({_all: new RegExp($scope.searchString,"i")}, function(data){
			if(data.length){
				// change location to /search
				$location.url("/search");
				console.log("FOUND:",data);
				$rootScope.searchResult = data;
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