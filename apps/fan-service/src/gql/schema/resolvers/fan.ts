import { Resolvers } from '../../../typings/resolvers';
import { addFan, getFanById, getFans, getFansForBand } from '../../../useCases';

const fanResolvers: Resolvers = {
  Query: {
    fans: (_, __, { dataSources }) => getFans(dataSources),
    fan: (_, { id }, { dataSources }) =>
      getFanById(id, dataSources),
  },
  Mutation: {
    addFan: (_, { input }, { dataSources }) =>
      addFan(input, dataSources)
  },
  Band: {
    fans: ({ id }, _, { dataSources }) =>
      getFansForBand(id, dataSources)
  },
};

export default fanResolvers;
