import { ApolloError } from 'apollo-server-core';
import { AddFanInput, Fan } from '../typings/resolvers';
import { DataSources } from '../gql/datasources';
import { normalizeFanData } from './utils/normalizeFanData';

export const addFan = async (
  input: AddFanInput,
  { fanDataSource }: DataSources['dataSources']
): Promise<Fan | null> => {
  try {
    const fan = await fanDataSource.addFan(input);
    if (!fan) return null;
    return normalizeFanData(fan);
  } catch (e) {
    console.log('add fan error', e);
    throw new ApolloError('Error adding fan');
  }
}
