import express from "express";
import waitOn from "wait-on";
import { stitchSchemas } from "@graphql-tools/stitch";
import { subSchemas } from "./subSchemas";
import { createServer } from "@graphql-yoga/node";
import { stitchingDirectives } from "@graphql-tools/stitching-directives";
import { maxDepthPlugin } from '@escape.tech/graphql-armor-max-depth';
import {
  FilterObjectFields,
  FilterRootFields,
  wrapSchema,
} from "@graphql-tools/wrap";
import { services } from "./subSchemas/config";

// eslint-disable-next-line turbo/no-undeclared-env-vars
const PORT = Number(process.env.PORT) || 4000;
const stitchingConfig = stitchingDirectives();

function main() {
  const app = express();

  app.use("/graphql", async (req, res) => {
    const schema = await stitchSchemas({
      subschemaConfigTransforms: [stitchingConfig.stitchingDirectivesTransformer],
      subschemas: await subSchemas(stitchingConfig),
    });

    // filter out private fields and resolvers
    const filteredSchema = wrapSchema({
      schema,
      transforms: [
        new FilterRootFields((_, fieldName) => !fieldName.startsWith("_")),
        new FilterObjectFields((_, fieldName) => !fieldName.startsWith("_")),
      ],
    });

    const graphqlServer = createServer({
      schema: filteredSchema,
      maskedErrors: false,
      plugins: [
        maxDepthPlugin({ n: 6 })
      ],
    });

    return graphqlServer(req, res);
  });

  app.listen(PORT, () => {
    console.log(`🚀  Gateway ready at http://localhost:${PORT}/graphql`);
  });
}

const resources = services.map(({ port }) => `tcp:${port}`);
waitOn({ resources }, main);
