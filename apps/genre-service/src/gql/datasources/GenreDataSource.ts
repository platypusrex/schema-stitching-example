import { PrismaClient } from "@prisma/client";
import { DataSource, DataSourceConfig } from "apollo-datasource";
import { AddGenreInput } from "../../typings/resolvers";

export class GenreDataSource extends DataSource {
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

  async addGenre(input: AddGenreInput) {
    return this.store.genre.create({ data: input });
  }

  async getGenresForBand(ids: string[]) {
    return this.store.genre.findMany({
      where: {
        id: { in: ids },
      },
    });
  }

  async getGenres() {
    return this.store.genre.findMany();
  }
}
