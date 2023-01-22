import { Resolvers } from "../../../typings/resolvers";
import {
  addInstrument,
  getInstruments,
  getInstrumentsForMusician,
} from "../../../useCases";

const instrumentResolvers: Resolvers = {
  Query: {
    instruments: (_, __, { dataSources }) => getInstruments(dataSources),
    _instruments: (_, { ids }, { dataSources }) =>
      getInstrumentsForMusician(ids, dataSources),
  },
  Mutation: {
    addInstrument: (_, { input }, { dataSources }) =>
      addInstrument(input, dataSources),
  },
};

export default instrumentResolvers;
