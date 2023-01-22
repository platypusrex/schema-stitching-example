import { DataSources } from '../gql/datasources';
import { Band } from '../typings/resolvers';
import { normalizeBandData } from './utils/normalizeBandData';

export const getBandsByIds = async (
  ids: string[],
  { bandDataSource }: DataSources["dataSources"]
): Promise<{ bands: Band[] | null }> => {
  const bands = await bandDataSource.getBandsByIds(ids);
  return {
    bands: bands?.map((band) => normalizeBandData(band)) ?? null,
  };
};
