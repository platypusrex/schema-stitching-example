import path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers } from '@graphql-tools/merge';
import { GraphQLResolverMap } from '@apollo/subgraph/src/schema-helper';

const resolversArray = loadFilesSync(path.join(__dirname, '.'), {
  ignoreIndex: true,
});

export const resolvers = mergeResolvers(resolversArray) as GraphQLResolverMap<unknown>;
