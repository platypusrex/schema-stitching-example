import { Resolvers } from "../../../typings/resolvers";
import { getGenres, getBandGenres, addGenre } from "../../../useCases";

const genreResolvers: Resolvers = {
  Query: {
    genres: (_, __, { dataSources }) => getGenres(dataSources),
    _genres: (_, { ids }, { dataSources }) => getBandGenres(ids, dataSources),
  },
  Mutation: {
    addGenre: (_, { input }, { dataSources }) => addGenre(input, dataSources),
  },
};

export default genreResolvers;
