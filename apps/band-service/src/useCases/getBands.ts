import { DataSources } from "../gql/datasources";
import { Band } from "../typings/resolvers";
import { normalizeBandData } from "./utils/normalizeBandData";

export const getBands = async ({
  bandDataSource,
}: DataSources["dataSources"]): Promise<Band[] | null> => {
  const bands = await bandDataSource.getBands();
  if (!bands) return null;
  return bands.map((band) => normalizeBandData(band));
};
