import { createServer } from 'base-server';
import { ApolloServer } from 'apollo-server-express';
import { buildFederatedSchema } from '@apollo/federation';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault
} from 'apollo-server-core';
import { schema } from './gql/schema';

(async function() {
  await createServer({
    port: 4005,
    name: 'fan-service',
    server: (httpServer) => new ApolloServer({
      schema: buildFederatedSchema(schema),
      csrfPrevention: true,
      cache: 'bounded',
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        ApolloServerPluginLandingPageLocalDefault({ embed: true }),
      ],
    }),
  });
})()
