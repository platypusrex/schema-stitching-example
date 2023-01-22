import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:4003/graphql',
  documents: null,
  generates: {
    'src/typings/resolvers.ts': {
      config: {
        contextType: './context#Context',
        scalars: {
          Date: 'Date',
        }
      },
      plugins: [
        'typescript',
        'typescript-resolvers'
      ],
    },
  },
};
export default config
