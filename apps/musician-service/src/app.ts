import { createServer } from "base-server";
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import { schema } from "./gql/schema";
import { createDb } from "./db";
import { MusicianDataSource } from "./gql/datasources";

const PORT = Number(process.env.PORT) || 4001;
const SERVICE_NAME = "musician-service";

(async function () {
  const db = await createDb();
  await createServer({
    port: PORT,
    name: SERVICE_NAME,
    server: (httpServer) =>
      new ApolloServer({
        schema,
        cache: "bounded",
        csrfPrevention: true,
        plugins: [
          ApolloServerPluginDrainHttpServer({ httpServer }),
          ApolloServerPluginLandingPageLocalDefault({ embed: true }),
        ],
        dataSources: () => ({
          musicianDataSource: new MusicianDataSource(db),
        }),
      }),
  });
})();
