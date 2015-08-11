app.controller("menuController", ["$http", "$scope", function($http, $scope) {
  console.log("The menuController is alive!");
  $scope.isCollapsed = true;
  $scope.collapseNav = function() {
    $scope.isCollapsed = !$scope.isCollapsed;
    console.log("isCollapsed", $scope.isCollapsed)
  }

}]);
