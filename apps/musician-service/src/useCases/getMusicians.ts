import { DataSources } from "../gql/datasources";
import { Musician } from "../typings/resolvers";
import { normalizeMusicianData } from "./utils/normalizeMusicianData";

export const getMusicians = async ({
  musicianDataSource,
}: DataSources["dataSources"]): Promise<Musician[] | null> => {
  const musicians = await musicianDataSource.getMusicians();
  if (!musicians) return null;
  return musicians.map((musician) => normalizeMusicianData(musician));
};
