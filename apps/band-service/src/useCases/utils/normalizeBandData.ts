import { Band as SQLBand } from "@prisma/client";
import { Band } from "../../typings/resolvers";

export const normalizeBandData = ({
  genres,
  members,
  ...rest
}: SQLBand): Band => {
  return {
    _genreIds: genres,
    _musicianIds: members,
    ...rest,
  };
};
