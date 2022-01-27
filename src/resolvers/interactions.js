const { AuthenticationError, UserInputError } = require('apollo-server');
const checkAuth = require('../util/auth');
const User = require('../models/Users');
// const Books = require('../models/Books'); // redundant
const Interactions = require('../models/Interactions')

module.exports = {
  Query: {
    async getInteractions() {
      try {
        const interactions = await Interactions.find();
        return interactions;
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async  likeBook(_, { bookId }, context) {
      const { username } = checkAuth(context);
      const user = await User.findOne({ username });
      // const book = await Books.findById(bookId); // redundant
      const likeInt = await Interactions.findOne({ bookId });
      //check if the user is available in user table
      if (likeInt) {
        if(user) {
        if (likeInt.likes.find((like) => like.username === username)) {
          likeInt.likes = likeInt.likes.filter((like) => like.username !== username);
          await likeInt.save();
          return "You disliked this book";
        } else {
          likeInt.likes.push({
            username,
            likedAt: new Date().toISOString()
          });
          await likeInt.save();
          return "You liked this book";
        }
        } else throw new AuthenticationError('User Not Found');
     } else throw new UserInputError('Book Not Found');
    },
    
    async readBook(_, { bookId }, context) {
      const { username } = checkAuth(context);
      //check if the user is available in user table
      const user = await User.findOne({ username });
      // const book = await Books.findById(bookId); // redundant
      const readInt = await Interactions.findOne({ bookId });
      if (readInt) {
        if(user) {
        if (readInt.reads.find((read) => read.username === username)) {
          return "You already read this book";
        }
        else{ 
          readInt.reads.push({
            username,
            readAt: new Date().toISOString()
          });
          await readInt.save();
          return "You read this book";
        }
        } else throw new AuthenticationError('User Not Found');
      } else throw new UserInputError('Book Not Found');
    }
  }
};