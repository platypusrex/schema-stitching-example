import { DataSources } from "../gql/datasources";
import { Musician } from "../typings/resolvers";
import { normalizeBandData } from "./utils/normalizeBandData";

export const getBandsForMusician = async (
  id: string,
  { bandDataSource }: DataSources["dataSources"]
): Promise<Musician | null> => {
  const bands = await bandDataSource.getBandsForMusician(id);
  if (!bands) return null;
  return {
    id,
    bands: bands.map((band) => normalizeBandData(band)),
  };
};
