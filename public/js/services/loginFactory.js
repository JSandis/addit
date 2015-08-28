app.factory("login", ["$http", "$rootScope", "$location", function($http, $rootScope, $location) {

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
			$http.post('api/login', credentials).success(function(data) {
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