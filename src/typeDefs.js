const { gql } = require('apollo-server');

module.exports = gql`
  type Users {
    id: ID!
    fname: String!
    lname: String!
    token: String!
    email: String!
    phone: Float!
    username: String!
    createdAt: String!
  }
  type User {
    id: ID!
    fname: String!
    lname: String!
    email: String!
    phone: Float!
    username: String!
    createdAt: String!
  }
  input SignupInput {
    fname: String!
    lname: String!
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
    phone: Float!
  }
  type Read {
    _id: ID!
    readAt: String!
    username: String!
  }
  type Like {
    _id: ID!
    likedAt: String!
    username: String!
  }
  type Books {
    _id: ID!
    title: String!,
    story: String!,
    published: String!
    username: String!
    reads: [Read]!
    likes: [Like]!
    likeCount: Int!
    readCount: Int!
  }

  type Query {
    getUsers: [User]
    newBooks: [Books]
    topBooks: [Books]
  }
  type Mutation {
    signup(signupInput: SignupInput): Users!
    signin(username: String!, password: String!): Users!
    deleteUser(userId: ID!): String!
    updateProfile(userId: ID!, fname: String!, lname: String!, email: String!, phone: Float!): String!
    createBook(title: String!, story: String!): Books!
    updateBook(bookId: ID!, title: String!, story: String!): String!
    deleteBook(bookId: ID!): String!
    readBook(bookId: ID!): String!
    likeBook(bookId: ID!): String!
  }
`;