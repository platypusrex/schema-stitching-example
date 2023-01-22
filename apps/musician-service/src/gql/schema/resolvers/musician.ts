import { Resolvers } from "../../../typings/resolvers";
import {
  addMusician,
  addMusicianInstruments,
  getBandMembers,
  getMusicians,
} from "../../../useCases";

const musicianResolvers: Resolvers = {
  Query: {
    musicians: (_, __, { dataSources }) => getMusicians(dataSources),
    _musicians: (_, { ids }, { dataSources }) =>
      getBandMembers(ids, dataSources),
  },
  Mutation: {
    addMusician: (_, { input }, { dataSources }) =>
      addMusician(input, dataSources),
    addMusicianInstruments: (_, { input }, { dataSources }) =>
      addMusicianInstruments(input, dataSources),
  },
};

export default musicianResolvers;
