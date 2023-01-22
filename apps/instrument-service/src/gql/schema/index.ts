import { print } from "graphql";
import { stitchingDirectives } from "@graphql-tools/stitching-directives";
import { mergeResolvers } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs as defaultTypeDefs } from "./typeDefs";
import { resolvers as defaultResolvers } from "./resolvers";

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
