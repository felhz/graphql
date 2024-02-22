const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    hello: String
    name: String
  }
  type Query {
    ccc: String
  }
  type Book {
    title: String
    author: String
  }
  type Mutation {
    addBook(title: String, author: String): Book
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    name: () => 'Hello world!',
    ccc: () => 'Hello world!',
  },
  Mutation: {
    addBook: (_, args) => {
      console.log(args);
      return {
        title: '11',
        author: '1',
      };
    },
  },
};

const app = express();

const init = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });
  app.listen({ port: 4000 }, () =>
    console.log('Now browse to http://localhost:4000' + server.graphqlPath)
  );
};
init();
