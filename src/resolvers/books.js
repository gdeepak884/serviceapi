const { AuthenticationError, UserInputError } = require('apollo-server');
const { validateBook } = require('../util/validation');
const Books = require('../models/Books');
const checkAuth = require('../util/auth');

module.exports = {
  Query: {
    async newBooks() {
      try {
        const books = await Books.find().sort({ published: -1 });
        return books;
      } catch (err) {
        throw new Error(err);
      }
    },
    async topBooks() {
      try {
        const interactions = Books.aggregate([{
           $project: {
              title: "$title",
              story: "$story",
              published: "$published",
              username: "$username",
              reads: "$reads",
              likes: "$likes",
              numberOfInteractions: { $sum :[{ $size: "$reads" },{ $size: "$likes" }]}
            }
          }
        ])
        const books = await interactions.sort({ numberOfInteractions: -1 });
        return books;
      } catch (err) {
        throw new Error(err);
      }
    }
  },

  Mutation: {
    async createBook(_, { title, story }, context) {
      const user = checkAuth(context);
      const { errors, valid } = validateBook(title, story);
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
      
      const titles = await Books.findOne({ title });
      if (titles) {
        throw new UserInputError('Same title book is already exist', {
          errors: {
            titles: 'Same title book is already exist!'
          }
        });
      }

      const newBook = new Books({
        title,
        story,
        user: user.id,
        username: user.username,
        published: new Date().toISOString()
      });
      const book = await newBook.save();
      return book;
    },

    async deleteBook(_, { bookId }, context) {
      const user = checkAuth(context);

      try {
        const book = await Books.findById(bookId);
        if(book) {
        if (user.username === book.username) {
          await book.delete();
          return 'Book Deleted!';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      }else{
        return "No Book with the specified bookid is available to delete!";
      } 
    }
      catch (err) {
        throw new Error(err);
      }
    },

    async updateBook(_, { bookId, title, story }, context) {
      const user = checkAuth(context);
      try {
        const book = await Books.findById(bookId);
        if(book) {
        if (user.username === book.username) {
          const { errors, valid } = validateBook(title, story);
          if (!valid) {
            throw new UserInputError('Errors', { errors });
          }
          book.title = title;
          book.story = story;
          await book.save();
          return 'Book Updated!';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } else{
        return "Book Not Found!";
      }
    }catch (err) {
        throw new Error(err);
      }
    }
  }
};