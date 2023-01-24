import { createServer } from 'base-server';
import { ApolloServer } from 'apollo-server-express';
import { buildFederatedSchema } from '@apollo/federation';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault
} from 'apollo-server-core';
import { schema } from './gql/schema';
import { createDb } from './db';
import { FanDataSource } from './gql/datasources';

// eslint-disable-next-line turbo/no-undeclared-env-vars
const PORT = Number(process.env.PORT) || 4005;
const SERVICE_NAME = "fan-service";

(async function() {
  const db = await createDb();
  await createServer({
    port: PORT,
    name: SERVICE_NAME,
    server: (httpServer) => new ApolloServer({
      schema: buildFederatedSchema(schema),
      csrfPrevention: true,
      cache: 'bounded',
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        ApolloServerPluginLandingPageLocalDefault({ embed: true }),
      ],
      dataSources: () => ({
        fanDataSource: new FanDataSource(db),
      }),
    }),
  });
})()
