import { createServer } from "base-server";
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import { schema } from "./gql/schema";
import { InstrumentDataSource } from "./gql/datasources";
import { createDb } from "./db/createDb";

const PORT = Number(process.env.PORT) || 4004;
const SERVICE_NAME = "instrument-service";

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
          instrumentDataSource: new InstrumentDataSource(db),
        }),
      }),
  });
})();
