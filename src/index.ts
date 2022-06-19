import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import dotenv from 'dotenv'

dotenv.config()

import { context } from './context'
import { schema } from './schema/schema';

export const server = new ApolloServer({
  schema,
  introspection: true, 
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  context,
})

const port = process.env.PORT || 5000;
server.listen({port})
  .then(({url}) => console.log(`Server running at ${url}`))
  .catch(err => console.log(err.message))