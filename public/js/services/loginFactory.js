app.factory("login", ["$http", "$rootScope", "$location", "User", function($http, $rootScope, $location, User) {

	function updateObj(inObj, outObj) {
		for (var i in inObj) {
			delete outObj[i];
		}

		for (var j in inObj) {
			outObj[j] = inObj[j];
		}
	}

	var loginObj = {
		user: {},
		login: function(credentials, callback) {
			console.log("login factory credentials: ", credentials);
			$http.post('api/login', credentials).success(function(data) {
				console.log("login factory data: ",data);
				updateObj(data ? data : {}, loginObj.user);

				$rootScope.$broadcast("login");
				
				callback && callback(loginObj.user);
			});
		},
		check: function(callback) {
			$http.get('api/login').success(function(data) {
				updateObj(data ? data : {}, loginObj.user);

				callback && callback(loginObj.user);
			});
		},
		logout: function(callback) {
			$http.delete('api/login').success(function(data) {
				updateObj({}, loginObj.user);

				$rootScope.$broadcast("logout");

				callback && callback(loginObj.user);
			});
		},
		getUser: function(callback) {
			if (loginObj.user._id) {
				User.getById(loginObj.user._id, callback);
			} else {
				callback(false);
			}
		}
	};

	loginObj.check(function() {
		if (!loginObj.user._id) {
			$rootScope.$broadcast("logout");
		}
	});
	setInterval(function(){
		loginObj.check(function() {
			if (!loginObj.user._id) {
				$rootScope.$broadcast("logout");
			}
		});
	}, 30000);


	return loginObj;
}]);