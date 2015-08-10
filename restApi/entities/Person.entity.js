// require mongoose
var mongoose = require("mongoose");

// create a Schema for a 'Car' entity
var PersonSchema = mongoose.Schema({
  Name: String,
  Age: Number,
  Gender: Number
});

// create a Person model and attach it to a MongoDB Collection
var Person = mongoose.model("Persons", PersonSchema);

// and export the model to require()
module.exports = Person;