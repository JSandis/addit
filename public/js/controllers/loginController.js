app.controller( "loginController", ["$http", "$scope", "$modal", function( $http, $scope, $modal ) {
	console.log( "loginController Working!!!" );

  $scope.open = function (size) {

    var modalInstance = $modal.open()({
      animation: $scope.animationsEnabled,
      templateUrl: 'partials/login.html',
      controller: 'ModalInstanceCtrl',
      size: size
    });

    modalInstance.result.then(function (data) {
      console.log("Modal for login closed, and sent", data);
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  /*Relevant login code put in here*/

app.controller('ModalInstanceCtrl', ["$scope", "modalInstance", function ($scope, $modalInstance) {

  $scope.loginSubmit = function () {
    //Run som SUBMIT LOGIN code here
    $modalInstance.close("data form OK");
  };

  $scope.cancel = function {
    $modalInstance.dismiss('cancel');
  };
}]);
