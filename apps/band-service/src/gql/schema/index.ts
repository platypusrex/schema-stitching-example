import { print } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeResolvers } from "@graphql-tools/merge";
import { stitchingDirectives } from "@graphql-tools/stitching-directives";
import { resolvers as defaultResolvers } from "./resolvers";
import { typeDefs as defaultTypeDefs } from "./typeDefs";

const { stitchingDirectivesTypeDefs, stitchingDirectivesValidator } =
  stitchingDirectives();

const typeDefs = `
  ${stitchingDirectivesTypeDefs}
  ${print(defaultTypeDefs)}
`;

const resolvers = mergeResolvers([
  defaultResolvers,
  {
    Query: { _sdl: () => typeDefs },
  },
]);

export const schema = stitchingDirectivesValidator(
  makeExecutableSchema({
    typeDefs,
    resolvers,
  })
);
