import { DataSources } from "../gql/datasources";
import { Genre } from "../typings/resolvers";
import { normalizeBandData } from "./utils/normalizeBandData";

export const getBandsForGenre = async (
  id: string,
  { bandDataSource }: DataSources["dataSources"]
): Promise<Genre | null> => {
  const bands = await bandDataSource.getBandsForGenre(id);
  if (!bands) return null;
  return {
    id,
    bands: bands.map((band) => normalizeBandData(band)),
  };
};
