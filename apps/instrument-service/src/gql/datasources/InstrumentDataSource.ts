import { PrismaClient } from "@prisma/client";
import { DataSource, DataSourceConfig } from "apollo-datasource";
import { AddInstrumentInput } from "../../typings/resolvers";

export class InstrumentDataSource extends DataSource {
  private store: PrismaClient;
  context: Object | undefined;
  cache: Object | undefined;

  constructor(db: PrismaClient) {
    super();
    this.store = db;
  }

  initialize(config: DataSourceConfig<any>) {
    this.context = config.context;
    this.cache = config.cache;
  }

  async addInstrument(input: AddInstrumentInput) {
    return this.store.instrument.create({ data: input });
  }

  async getInstruments() {
    return this.store.instrument.findMany();
  }

  async getInstrumentsForMusician(ids: string[]) {
    return this.store.instrument.findMany({
      where: {
        id: { in: ids },
      },
    });
  }
}
