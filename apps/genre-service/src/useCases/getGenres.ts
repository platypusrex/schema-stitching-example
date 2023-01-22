import { DataSources } from "../gql/datasources";
import { Genre } from "../typings/resolvers";
import { normalizeGenreData } from "./utils/normalizeGenreData";

export const getGenres = async ({
  genreDataSource,
}: DataSources["dataSources"]): Promise<Genre[] | null> => {
  const genres = await genreDataSource.getGenres();
  if (!genres) return null;
  return genres.map((genre) => normalizeGenreData(genre));
};
