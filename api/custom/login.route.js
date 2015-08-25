module.exports = function(mongoose) {
	var config = require(process.cwd() + '/config');
    var sha256 = require('sha256');

	return function(req, res) {
		if(req.method == "GET") {
			if(req.session.user) {
				res.json(req.session.user);
				console.log("User logged in: ", req.session.user.username);
			} else {
				res.json(false);
			}
		} else if(req.method == "POST") {
			if(!req.body.email || !req.body.password) {
				res.json(false);
				return;
			}

			req.body.password = sha256(config.hashSalt + req.body.password);

			mongoose.model("User").findOne(req.body, function(err, data) {
				if(err) {
					throw err;
				}
				console.log("Login data: ", data);

				data && (delete data.password);
				data && (req.session.user = data);

				res.json(data ? data : false);
			});
		} else if(req.method == "DELETE") {
			req.session.destroy(function(err) {
				if(err) {
					throw err;
				}
				res.json(true);
			});
		} else {
			res.json({error: "Method not allowed"});
		}
	};
};