import { Resolvers } from "../../../typings/resolvers";
import {
  addBand,
  addBandGenre,
  addBandMember,
  getBands,
  getBandsForGenre,
  getBandsForMusician,
  getBandsByIds,
} from "../../../useCases";

const bandResolvers: Resolvers = {
  Query: {
    bands: (_, __, { dataSources }) => getBands(dataSources),
    _musicianBands: (_, { id }, { dataSources }) =>
      getBandsForMusician(id, dataSources),
    _genreBands: (_, { id }, { dataSources }) =>
      getBandsForGenre(id, dataSources),
    _bands: (_, { ids }, { dataSources }) =>
      getBandsByIds(ids, dataSources),
  },
  Mutation: {
    addBand: (_, { input }, { dataSources }) =>
      addBand(input, dataSources),
    addBandMember: (_, { input }, { dataSources }) =>
      addBandMember(input, dataSources),
    addBandGenre: (_, { input }, { dataSources }) =>
      addBandGenre(input, dataSources),
  },
};

export default bandResolvers;
