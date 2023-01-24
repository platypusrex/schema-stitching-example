import { DataSources } from '../gql/datasources';
import { Fan } from '../typings/resolvers';
import { normalizeFanData } from './utils/normalizeFanData';

export const getFans = async ({
  fanDataSource
}: DataSources["dataSources"]): Promise<Fan[] | null> => {
  const fans = await fanDataSource.getBands();
  if (!fans?.length) return null;
  return fans.map((fan) => normalizeFanData(fan));
};
