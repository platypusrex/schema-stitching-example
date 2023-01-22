import { AddMusicianInput, Musician } from "../typings/resolvers";
import { DataSources } from "../gql/datasources";
import { ApolloError } from "apollo-server-express";
import { normalizeMusicianData } from "./utils/normalizeMusicianData";

export const addMusician = async (
  input: AddMusicianInput,
  { musicianDataSource }: DataSources["dataSources"]
): Promise<Musician | null> => {
  try {
    const musician = await musicianDataSource.addMusician(input);
    if (!musician) return null;
    return normalizeMusicianData(musician);
  } catch (e) {
    throw new ApolloError("error adding musician");
  }
};
