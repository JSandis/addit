module.exports = function(modelName, method, query, req, res) {

	
	// password should not be stored
	if(modelName == "User" && method == "GET") {
		if(res.password) {
			res.password = undefined;
		}
		return true;
	}

	if (req.method != "GET" && !req.session.user) {
		return false;
	}

	return true;
};