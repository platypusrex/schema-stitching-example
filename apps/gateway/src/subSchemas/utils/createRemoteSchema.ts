import { AsyncExecutor } from "@graphql-tools/utils/typings/executor";
import { print } from "graphql";
import { GraphQLClient } from "graphql-request";
import { ExecutionResult } from "@graphql-tools/utils/typings/Interfaces";
import { introspectSchema, wrapSchema } from "@graphql-tools/wrap";

interface CreateRemoteSchemaOptions {
  url: string;
  log?: boolean;
}

export const createRemoteSchema = async ({
  url,
  log = false,
}: CreateRemoteSchemaOptions) => {
  const executor: AsyncExecutor = async ({ document, variables }) => {
    const query = typeof document === "string" ? document : print(document);
    if (log)
      console.log(`# -- OPERATION ${new Date().toISOString()}:\n${query}`);
    const client = new GraphQLClient(url, { errorPolicy: "all" });
    return (await client.rawRequest(query, variables)) as ExecutionResult<any>;
  };

  return wrapSchema({
    schema: await introspectSchema(executor),
    executor,
  });
};
