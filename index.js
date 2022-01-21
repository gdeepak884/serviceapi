const { ApolloServer, PubSub} = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./src/typeDefs');
const resolvers = require('./src/resolvers');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],  //remove/add this line to disable/enable playground
  context: ({ req }) => ({ req, PubSub })
});

var server_port = 80;
var server_host = '0.0.0.0';

mongoose
  .connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    return server.listen(server_port, server_host);
  })
  .then((res) => {
    console.log(`Playground on ${server_host}:${server_port}/graphql`);
  });