import { Fan, Resolvers } from '../../../typings/resolvers';

const fans = [
  {
    id: '71abcb70-2a81-481e-836d-b8274f9279c3',
    name: 'Fred',
    _bandIds: ['09f968a8-c06e-4c32-9a0e-63ce745ac128']
  },
  {
    id: '71abcb70-2a81-481e-836d-b8274f9279c4',
    name: 'Charles',
    _bandIds: ['09f968a8-c06e-4c32-9a0e-63ce745ac128']
  },
];

const fanResolvers: Resolvers = {
  Query: {
    fan: (_, { id }) =>
      fans.find(fan => fan.id === id) ?? null,
  },
  Band: {
    fans: ({ id }) => {
      const bandFans = fans.map((fan) => {
        return fan._bandIds.some((bandId) => bandId === id) ? fan : null;
      }).filter((fan) => !!fan) as Fan[];
      return bandFans.length ? bandFans : null;
    }
  },
};

export default fanResolvers;
