import { Instrument as SQLInstrument } from "@prisma/client";
import { Instrument } from "../../typings/resolvers";

export const normalizeInstrumentData = (
  instrument: SQLInstrument
): Instrument => {
  return instrument;
};
