module.exports = function(mongoose){

  var PostSchema = mongoose.Schema({
    content: String,
    images: [String],
    videos: [String],
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    createdAt: Date
  });

  var Post = mongoose.model("Post", PostSchema);

  return Post;
};