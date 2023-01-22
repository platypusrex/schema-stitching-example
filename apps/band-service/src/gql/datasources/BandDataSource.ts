import { PrismaClient } from "@prisma/client";
import { DataSource, DataSourceConfig } from "apollo-datasource";
import {
  AddBandGenreInput,
  AddBandInput,
  AddBandMemberInput,
} from "../../typings/resolvers";

export class BandDataSource extends DataSource {
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

  async addBand(input: AddBandInput) {
    return this.store.band.create({ data: input });
  }

  async addBandGenre({ bandId, genreId }: AddBandGenreInput) {
    return this.store.band.update({
      where: { id: bandId },
      data: { genres: { push: genreId } },
    });
  }

  async addBandMember({ bandId, memberId }: AddBandMemberInput) {
    return this.store.band.update({
      where: { id: bandId },
      data: { members: { push: memberId } },
    });
  }

  async getBands() {
    return this.store.band.findMany();
  }

  async getBandsByIds(ids: string[]) {
    return this.store.band.findMany({
      where: {
        id: { in: ids },
      },
    });
  }

  async getBandsForGenre(id: string) {
    return this.store.band.findMany({
      where: {
        genres: { has: id },
      },
    });
  }

  async getBandsForMusician(id: string) {
    return this.store.band.findMany({
      where: {
        members: { has: id },
      },
    });
  }
}
