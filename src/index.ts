import express from 'express';
import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from '@as-integrations/express5';
//import { expressMiddleware } from "@apollo/server/express4";
import cors from 'cors';
import bodyParser from 'body-parser';
import {ApolloServerPluginLandingPageGraphQLPlayground} from '@apollo/server-plugin-landing-page-graphql-playground'
import {prismaClient} from './lib/db.js';
import createApolloGraphqlServer from './graphql/index.js';

// Type definitions (schema)
// const typeDefs = `
//   type Query {
//     hello: String
//     say(name: String): String
//   }
//   type Mutation {
//     createUser(firstName: String!, lastName: String!, email: String!, password: String!): Boolean
//   }  
// `;

// // Resolvers 
// const resolvers = {
//   Query: {
//     hello: () => 'Hello world!',
//     say: (_:any, {name}:{name:String}) => `Hey ${name}, How are you?`
//   },
//   Mutation: {
//     createUser: async (_:any, {firstName, lastName, email, password}: 
//       {firstName:string; lastName:string; email: string; password: string}) => {
//         await prismaClient.user.create({
//           data:{
//             email,
//             firstName,
//             lastName,
//             password,
//             salt: 'random_salt'
//           }
//         });
//         return true;
//       }
//   }
// };

// Create Apollo Server with Playground plugin
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   introspection: true, // 👈 Needed in production to allow introspection
//   plugins: [ApolloServerPluginLandingPageGraphQLPlayground()], // 👈 Enable GUI
// });

async function start() {
  const app = express();

  //const server = await createApolloGraphqlServer();
  app.use(
    '/graphql',
    cors(),
    bodyParser.json(),
    expressMiddleware(await createApolloGraphqlServer())
  );

  app.listen(8000, () => {
    console.log('🚀 Server ready at http://localhost:8000/graphql');
  });
}

start();
