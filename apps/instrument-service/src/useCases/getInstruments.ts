import { DataSources } from "../gql/datasources";
import { normalizeInstrumentData } from "./utils/normalizeInstrumentData";
import { ApolloError } from "apollo-server-core";

export const getInstruments = async ({
  instrumentDataSource,
}: DataSources["dataSources"]) => {
  try {
    const instruments = await instrumentDataSource.getInstruments();
    if (!instruments?.length) return null;
    return instruments.map((instrument) => normalizeInstrumentData(instrument));
  } catch (e) {
    throw new ApolloError("error fetching instruments");
  }
};
