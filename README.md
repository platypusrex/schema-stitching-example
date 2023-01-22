# schema-stitching-example

This is a playground for testing graphql microservice architectural pattern. 
It utilizes schema stitching (created and maintained by [The Guild](https://the-guild.dev/))
to create a single GraphQL gateway schema from multiple underlying GraphQL services or subgraphs. 
The solution itself is fairly comparable to Apollo Federation automated query planning, merged types,
and declarative schema directives.

**Note:**
There are a mix of services here using both stitched and federated schemas. The gateway is capable of
converting any federated sdl to a stitched sdl. Both the stitched and federated schema services are 
extending/merging types and resolving fields for one another.

## What's inside?

### Packages

- `base-server`: shared apollo server
- `custom-scalars`: shared graphQL scalars
- `http-datasource`: a wrapper around apollo-http-datasource
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

### Apps

- `band-service`: microservice with stitched schema
- `fan-service`: microservice with federated schema
- `genre-service`: microservice with stitched schema
- `instrument-service`: microservice with stitched schema
- `musician-service`: microservice with stitched schema
- `gateway`: proxy responsible for stitching together and creating single schema from all subgraphs 

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
yarn run build
```

### Develop

To develop all apps and packages, run the following command:

```
yarn run dev
```

### Generate

To generate graphQL types for all services, run the following command:

```
yarn run generate
```
