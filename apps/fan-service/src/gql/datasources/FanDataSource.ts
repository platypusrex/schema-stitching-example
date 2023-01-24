import { PrismaClient } from "@prisma/client";
import { DataSource, DataSourceConfig } from "apollo-datasource";
import { AddFanInput } from '../../typings/resolvers';
// import {
//   AddBandGenreInput,
//   AddBandInput,
//   AddBandMemberInput,
// } from "../../typings/resolvers";

export class FanDataSource extends DataSource {
  store: PrismaClient;
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

  async addFan(input: AddFanInput) {
    const { name, bandIds } = input;
    return this.store.fan.create({ data: { name, bands: bandIds } });
  }

  async getBands() {
    return this.store.fan.findMany();
  }

  async getFanById(id: string) {
    return this.store.fan.findUnique({ where: { id }});
  }

  async getFansByBandId(id: string) {
    return this.store.fan.findMany({
      where: {
        bands: { has: id },
      },
    });
  }
}
