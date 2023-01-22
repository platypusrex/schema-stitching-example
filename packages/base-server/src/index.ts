import http, { Server } from "http";
import express from "express";
import { ApolloServer } from "apollo-server-express";

export interface GQLServerConfig {
  server: (httpServer: Server) => ApolloServer;
  port: number;
  name?: string;
}

export const createServer = async ({ server, port, name }: GQLServerConfig) => {
  const app = express();
  const httpServer = http.createServer(app);
  const gqlServer = server(httpServer);
  await gqlServer.start();
  gqlServer.applyMiddleware({ app });
  await new Promise<void>((res) => httpServer.listen({ port }, res));
  const serviceName = name ?? "service";
  console.log(
    `🚀 ${serviceName} ready at http://localhost:${port}${gqlServer.graphqlPath}`
  );
};
