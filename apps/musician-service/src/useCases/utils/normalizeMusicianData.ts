import { Musician as SQLMusician } from "@prisma/client";
import { Musician } from "../../typings/resolvers";

export const normalizeMusicianData = ({
  instruments,
  ...rest
}: SQLMusician): Musician => {
  return { _instrumentIds: instruments, ...rest };
};
