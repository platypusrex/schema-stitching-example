import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:4005/graphql',
  documents: null,
  generates: {
    'src/typings/resolvers.ts': {
      config: {
        federation: true,
        useIndexSignature: true,
        mappers: {
          _Service: 'any'
        }
      },
      plugins: [
        {
          add: {
            content: 'type Query_EntitiesArgs = any',
          },
        },
        'typescript',
        'typescript-resolvers'
      ],
    },
  },
};
export default config
