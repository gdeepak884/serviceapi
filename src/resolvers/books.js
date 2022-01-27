const { AuthenticationError, UserInputError } = require('apollo-server');
const { validateBook } = require('../util/validation');
const Books = require('../models/Books');
const Interactions = require('../models/Interactions')
const checkAuth = require('../util/auth');

module.exports = {
  Query: {
    async newBooks() {
      try {
        const new_books = await Interactions.aggregate([
          {
            $lookup: {
              from: 'books',
              localField: 'bookId',
              foreignField: '_id',
              as: 'books'
            }
          },
          {
            $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$books", 0 ] }, "$$ROOT" ] } },
         },

         { 
         $project: {  
            bookId: 1,
            title: 1,
            story: 1,
            published: 1,
            username: 1,
            reads: 1,
            likes: 1,
            likeCount: { $size: "$likes" },
            readCount: { $size: "$reads" },
            numberOfInteractions: { $sum :[{ $size: "$reads" },{ $size: "$likes" }]}
           } 
          }
         ]).sort({ published: -1 })
        return new_books;
      } catch (err) {
        throw new Error(err);
      }
    },

    async topBooks() {
      try {
        const top_books = await Interactions.aggregate([
          {
            $lookup: {
              from: 'books',
              localField: 'bookId',
              foreignField: '_id',
              as: 'books'
            }
          },
          {
            $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$books", 0 ] }, "$$ROOT" ] } },
         },

         { 
         $project: {  
            bookId: 1,
            title: 1,
            story: 1,
            published: 1,
            username: 1,
            reads: 1,
            likes: 1,
            likeCount: { $size: "$likes" },
            readCount: { $size: "$reads" },
            numberOfInteractions: { $sum :[{ $size: "$reads" },{ $size: "$likes" }]}
           } 
          }
         ]).sort({ numberOfInteractions: -1 })
        return top_books;
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

      const newInt = new Interactions({
        bookId: book._id,
        published: new Date().toISOString()
      });
      const Int = await newInt.save();
      return book;
    },

    async deleteBook(_, { bookId }, context) {
      const user = checkAuth(context);

      try {
        const book = await Books.findById(bookId);
        const Interaction = await Interactions.findOne({ bookId });
        if(book) {
        if (user.username === book.username) {
          await book.delete();
          //delete interactions for this book
          await Interaction.delete();
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