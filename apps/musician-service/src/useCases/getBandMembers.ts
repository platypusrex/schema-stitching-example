import { DataSources } from "../gql/datasources";
import { Band } from "../typings/resolvers";
import { normalizeMusicianData } from "./utils/normalizeMusicianData";

export const getBandMembers = async (
  ids: string[],
  { musicianDataSource }: DataSources["dataSources"]
): Promise<Band | null> => {
  const musicians = await musicianDataSource.getBandMembers(ids);
  if (!musicians?.length) return null;
  return {
    musicians: musicians.map((musician) => normalizeMusicianData(musician)),
  };
};
