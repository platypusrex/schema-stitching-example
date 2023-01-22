import { AddBandGenreInput, Band } from "../typings/resolvers";
import { DataSources } from "../gql/datasources";
import { ApolloError } from "apollo-server-express";
import { normalizeBandData } from "./utils/normalizeBandData";

export const addBandGenre = async (
  input: AddBandGenreInput,
  { bandDataSource }: DataSources["dataSources"]
): Promise<Band | null> => {
  try {
    const band = await bandDataSource.addBandGenre(input);
    if (!band) return null;
    return normalizeBandData(band);
  } catch (e) {
    throw new ApolloError("error adding band genre");
  }
};
