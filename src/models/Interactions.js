const { model, Schema } = require('mongoose');

const interactionSchema = new Schema({
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
  bookId: {
    type: Schema.Types.ObjectId,
    ref: 'book'
  }
});

module.exports = model('Interactions', interactionSchema);
