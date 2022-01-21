const { model, Schema } = require('mongoose');

const booksSchema = new Schema({
  title: String,
  story: String,
  username: String,
  published: String,
  reads: [
    {
      username: String,
      readAt: String
    }
  ],
  likes: [
    {
      username: String,
      likedAt: String
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
});

module.exports = model('Books', booksSchema);
