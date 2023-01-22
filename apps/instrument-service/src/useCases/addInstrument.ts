import { AddInstrumentInput } from "../typings/resolvers";
import { DataSources } from "../gql/datasources";
import { normalizeInstrumentData } from "./utils/normalizeInstrumentData";
import { ApolloError } from "apollo-server-core";

export const addInstrument = async (
  input: AddInstrumentInput,
  { instrumentDataSource }: DataSources["dataSources"]
) => {
  try {
    const instrument = await instrumentDataSource.addInstrument(input);
    if (!instrument) return null;
    return normalizeInstrumentData(instrument);
  } catch (e) {
    throw new ApolloError("error adding instrument");
  }
};
