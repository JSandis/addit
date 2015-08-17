app.controller( "signUpController", ["$http", "$scope", "$modal", "$log", function( $http, $scope, $modal, $log ) {
	console.log( "signUpController is up and running." );

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'partials/signup.html',
      controller: 'ModalInstanceCtrl',
      size: size
    });

    modalInstance.result.then(function (data) {
      console.log("Modal closed, and sent ", data);
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };


  $scope.newUser = {
    username: "",
    password: "",
    email: ""
  };

  $scope.submit = function() {
    console.log( "new user is: ", $scope.newUser );
  }
}]);


app.controller('ModalInstanceCtrl', ["$scope", "$modalInstance", function ($scope, $modalInstance) {


  $scope.signupSubmit = function () {
    // run some signup code
    $modalInstance.close("data from OK");
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

}]);
