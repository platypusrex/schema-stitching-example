import { createRemoteExecutor } from "./createRemoteExecutor";
import { fetchRemoteSchema } from "./fetchRemoteSchema";
import { SubschemaConfig } from "@graphql-tools/delegate/typings/types";
import { StitchingDirectivesResult } from '@graphql-tools/stitching-directives/typings/stitchingDirectives';
import { ServiceConfig } from "../config";

export const generateSubSchema = async ({
  url,
  stitchingConfig
}: ServiceConfig & { stitchingConfig?: StitchingDirectivesResult }): Promise<SubschemaConfig> => {
  const executor = await createRemoteExecutor({ url, log: true });
  return {
    schema: await fetchRemoteSchema(executor, stitchingConfig),
    executor,
    batch: true,
  };
};
