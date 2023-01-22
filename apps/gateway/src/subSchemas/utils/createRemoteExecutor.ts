import { print } from "graphql";
import { GraphQLClient } from "graphql-request";
import { AsyncExecutor } from "@graphql-tools/utils/typings/executor";
import { ExecutionResult } from "@graphql-tools/utils/typings/Interfaces";

interface CreateRemoteSchemaOptions {
  url: string;
  log?: boolean;
}

export const createRemoteExecutor = async ({
  url,
  log = false,
}: CreateRemoteSchemaOptions): Promise<AsyncExecutor> => {
  return async ({ document, variables }) => {
    const query = typeof document === "string" ? document : print(document);
    if (log)
      console.log(`# -- OPERATION ${new Date().toISOString()}:\n${query}`);
    const client = new GraphQLClient(url, { errorPolicy: "all" });
    return (await client.rawRequest(query, variables)) as ExecutionResult<any>;
  };
};
