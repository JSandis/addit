/**
 * Examples of route controllers:
 *
 */


// require all our entities
var Person = require('../entities/Person.entity');


// require API helper functions
var errMsg = require('../errMsg.function');

/*
  // create route as function:
  var route = function(req, res, params) {
    [ ... ]
  }

*/

// create route as object:
var route = {
  // default is the fallback function, not required
  default: function(req, res, params) {
    if (req.method == "GET") {
      // find all persons and return them as response
      Person.find({}, function(err, data) {
        // reply with either error or data
        res.json( err ? err : data );
      });
    } else {
      res.json( errMsg("Route not configured...") );
    }
  }
};

// export the route function || object
module.exports = route;