import { Fan } from '../typings/resolvers';
import { DataSources } from '../gql/datasources';
import { normalizeFanData } from './utils/normalizeFanData';

export const getFansForBand = async (
  id: string,
  { fanDataSource }: DataSources['dataSources']
): Promise<Fan[] | null> => {
  const fans = await fanDataSource.getFansByBandId(id);
  if (!fans?.length) return null;
  return fans.map((fan) => normalizeFanData(fan));
}
