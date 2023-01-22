import { services } from "./config";
import { generateSubSchema } from "./utils";
import { StitchingDirectivesResult } from '@graphql-tools/stitching-directives/typings/stitchingDirectives';

export const subSchemas = async (stitchingConfig: StitchingDirectivesResult) =>
  Promise.all(
    services.map(async (serviceConfig) => {
      if (!serviceConfig.federated) {
        return generateSubSchema(serviceConfig);
      }
      return generateSubSchema({
        ...serviceConfig,
        stitchingConfig
      });
    })
  );
