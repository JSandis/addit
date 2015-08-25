module.exports = function(mongoose){

  var UserSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: "Post"}]
  });

  var User = mongoose.model("User", UserSchema);

  return User;
};