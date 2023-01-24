import { Fan as SQLFan } from '@prisma/client';
import { Fan } from '../../typings/resolvers';
export const normalizeFanData = ({
  id,
  name,
  bands
}: SQLFan): Fan => ({
  id,
  name,
  _bandIds: bands
})
