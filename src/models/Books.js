const { model, Schema } = require('mongoose');

const booksSchema = new Schema({
  title: String,
  story: String,
  username: String,
  published: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
});

module.exports = model('Books', booksSchema);
