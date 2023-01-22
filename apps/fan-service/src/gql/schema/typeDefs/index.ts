import path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';

const typesArray = loadFilesSync(path.join(process.cwd(), '.'), {
  extensions: ['graphql'],
});

export const typeDefs = mergeTypeDefs(typesArray);
