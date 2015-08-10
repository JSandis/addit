//"addit" controller.
app.controller("userpageController", ["$http", "$scope", function($http, $scope) {
  console.log("userpageController: I'm alive!");



	$scope.submit = function() {
		console.log("Submit event for post: working!!!");
		// ex. for userpage.html:
		// <form ng-submit="submit()" ng-controller="ExampleController">
		//   Enter text and hit enter:
		//   <input type="text" ng-model="text" name="text" />
		//   <input type="submit" id="submit" value="Submit" />
		//   <pre>list={{list}}</pre>
		// </form>
	};

}]);