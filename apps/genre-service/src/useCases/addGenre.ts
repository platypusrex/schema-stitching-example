import { AddGenreInput, Genre } from "../typings/resolvers";
import { DataSources } from "../gql/datasources";
import { ApolloError } from "apollo-server-express";
import { normalizeGenreData } from "./utils/normalizeGenreData";

export const addGenre = async (
  input: AddGenreInput,
  { genreDataSource }: DataSources["dataSources"]
): Promise<Genre | null> => {
  try {
    const genre = await genreDataSource.addGenre(input);
    if (!genre) return null;
    return normalizeGenreData(genre);
  } catch (e) {
    throw new ApolloError("error adding genre");
  }
};
