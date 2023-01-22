import { DataSources } from "../gql/datasources";
import { Band } from "../typings/resolvers";
import { normalizeGenreData } from "./utils/normalizeGenreData";

export const getBandGenres = async (
  ids: string[],
  { genreDataSource }: DataSources["dataSources"]
): Promise<Band | null> => {
  const genres = await genreDataSource.getGenresForBand(ids);
  if (!genres?.length) return null;
  return {
    genres: genres.map((genre) => normalizeGenreData(genre)),
  };
};
