import express from 'express';
import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from '@as-integrations/express5';
//import { expressMiddleware } from "@apollo/server/express4";
import cors from 'cors';
import bodyParser from 'body-parser';
import {ApolloServerPluginLandingPageGraphQLPlayground} from '@apollo/server-plugin-landing-page-graphql-playground'

// Type definitions (schema)
const typeDefs = `
  type Query {
    hello: String
    say(name: String): String
  }
`;

// Resolvers
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    say: (_:any, {name}:{name:String}) => `Hey ${name}, How are you?`
  },
};

// Create Apollo Server with Playground plugin
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true, // 👈 Needed in production to allow introspection
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()], // 👈 Enable GUI
});

async function start() {
  const app = express();

  await server.start();

  app.use(
    '/graphql',
    cors(),
    bodyParser.json(),
    expressMiddleware(server)
  );

  app.listen(8000, () => {
    console.log('🚀 Server ready at http://localhost:8000/graphql');
  });
}

start();
