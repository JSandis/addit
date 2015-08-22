    app.controller('galleryController',["$http", "$scope", "User", "Post", "$modal", "$log", function($http, $scope, User, Post, $modal, $log) {
        console.log("galleryController: I'm alive!");
        this.current = 0;
        this.setCurrent = function(imagePath) {
            this.current = imagePath || 0;
        };
    }]);