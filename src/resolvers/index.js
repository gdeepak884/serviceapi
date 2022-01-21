const booksResolvers = require('./books');
const usersResolvers = require('./users');
const interactionsResolvers = require('./interactions');

module.exports = {
  Books: {
    likeCount: (parent) => parent.likes.length,
    readCount: (parent) => parent.reads.length
  },
  Query: {
    ...booksResolvers.Query,
    ...usersResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...booksResolvers.Mutation,
    ...interactionsResolvers.Mutation
  }
};
