import { PrismaClient } from "@prisma/client";
import { DataSource, DataSourceConfig } from "apollo-datasource";
import {
  AddMusicianInput,
  AddMusicianInstrumentInput,
} from "../../typings/resolvers";

export class MusicianDataSource extends DataSource {
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

  async addMusician(input: AddMusicianInput) {
    return this.store.musician.create({
      data: input,
    });
  }

  async getMusicians() {
    return this.store.musician.findMany();
  }

  async addMusicianInstruments({
    musicianId,
    instrumentIds,
  }: AddMusicianInstrumentInput) {
    return this.store.musician.update({
      where: { id: musicianId },
      data: { instruments: instrumentIds },
    });
  }

  async getBandMembers(ids: string[]) {
    return this.store.musician.findMany({
      where: {
        id: { in: ids },
      },
    });
  }
}
