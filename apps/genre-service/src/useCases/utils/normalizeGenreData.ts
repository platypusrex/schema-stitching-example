import { Genre as SQLGenre } from "@prisma/client";
import { Genre } from "../../typings/resolvers";

export const normalizeGenreData = (genre: SQLGenre): Genre => {
  return genre;
};
