import { DataSources } from "../gql/datasources";
import { Musician } from "../typings/resolvers";
import { normalizeInstrumentData } from "./utils/normalizeInstrumentData";
import { ApolloError } from "apollo-server-core";

export const getInstrumentsForMusician = async (
  ids: string[],
  { instrumentDataSource }: DataSources["dataSources"]
): Promise<Musician | null> => {
  try {
    const instruments = await instrumentDataSource.getInstrumentsForMusician(
      ids
    );
    if (!instruments?.length) return null;
    return {
      instruments: instruments.map((instrument) =>
        normalizeInstrumentData(instrument)
      ),
    };
  } catch (e) {
    throw new ApolloError("error querying musician instruments");
  }
};
