import { buildSchema, DocumentNode } from 'graphql';
import { federationToStitchingSDL } from '@graphql-tools/stitching-directives';
import { AsyncExecutor } from '@graphql-tools/utils/typings/executor';
import { StitchingDirectivesResult } from '@graphql-tools/stitching-directives/typings/stitchingDirectives';

export async function fetchRemoteSchema(
  executor: AsyncExecutor,
  stitchingConfig?: StitchingDirectivesResult
) {
  if (!stitchingConfig) {
    const result = await executor({ document: '{ _sdl }' as unknown as DocumentNode });
    return buildSchema((result as any).data._sdl);
  }

  const federationSDL = await executor({
    document: '{ _service { sdl } }' as unknown as DocumentNode
  });
  const stitchingSDL = federationToStitchingSDL(
    (federationSDL as any).data._service.sdl,
    stitchingConfig
  );
  return buildSchema(stitchingSDL);
}
