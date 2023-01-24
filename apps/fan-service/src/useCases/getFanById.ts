import { DataSources } from '../gql/datasources';
import { Fan } from '../typings/resolvers';
import { normalizeFanData } from './utils/normalizeFanData';

export const getFanById = async (
  id: string,
  { fanDataSource }: DataSources['dataSources']
): Promise<Fan | null> => {
  const fan = await fanDataSource.getFanById(id);
  if (!fan) return null;
  return normalizeFanData(fan);
}
