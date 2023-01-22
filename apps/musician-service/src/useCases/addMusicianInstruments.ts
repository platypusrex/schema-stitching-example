import { DataSources } from "../gql/datasources";
import { AddMusicianInstrumentInput } from "../typings/resolvers";
import { normalizeMusicianData } from "./utils/normalizeMusicianData";
import { ApolloError } from "apollo-server-express";

export const addMusicianInstruments = async (
  input: AddMusicianInstrumentInput,
  { musicianDataSource }: DataSources["dataSources"]
) => {
  try {
    const musician = await musicianDataSource.addMusicianInstruments(input);
    if (!musician) return null;
    return normalizeMusicianData(musician);
  } catch (e) {
    throw new ApolloError("error adding musician instrument");
  }
};
