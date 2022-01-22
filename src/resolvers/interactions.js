const { AuthenticationError, UserInputError } = require('apollo-server');
const checkAuth = require('../util/auth');
const User = require('../models/Users');
const Books = require('../models/Books');

module.exports = {
  Mutation: {
    async  likeBook(_, { bookId }, context) {
    
      const { username } = checkAuth(context);
      const user = await User.findOne({ username });
      const book = await Books.findById(bookId);
      //check if the user is available in user table
      if (book) {
        if(user) {
        if (book.likes.find((like) => like.username === username)) {
          book.likes = book.likes.filter((like) => like.username !== username);
          await book.save();
          return "You disliked this book";
        } else {
          book.likes.push({
            username,
            likedAt: new Date().toISOString()
          });
          await book.save();
          return "You liked this book";
        }
        } else throw new AuthenticationError('User Not Found');
     } else throw new UserInputError('Book Not Found');
    },
    
    async readBook(_, { bookId }, context) {

      const { username } = checkAuth(context);
      //check if the user is available in user table
      const user = await User.findOne({ username });
      const book = await Books.findById(bookId);
      if (book) {
        if(user) {
        if (book.reads.find((read) => read.username === username)) {
          return "You already read this book";
        }
        else{ 
            book.reads.push({
            username,
            readAt: new Date().toISOString()
          });
          await book.save();
          return "You read this book";
        }
        } else throw new AuthenticationError('User Not Found');
      } else throw new UserInputError('Book Not Found');
    }
  }
};