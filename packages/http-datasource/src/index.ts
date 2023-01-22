import {
  HTTPDataSource as ApolloHTTPDataSource,
  RequestOptions as HTTPRequestOptions,
  Request as HTTPRequest,
  Response as HTTPResponse,
} from "apollo-datasource-http";
import { HTTPDataSourceOptions } from "apollo-datasource-http/dist/src/http-data-source";
import DataLoader from "dataloader";

export type HTTPDataSourceConfig = HTTPDataSourceOptions;
export type RequestOptions = HTTPRequestOptions;
export type Request = HTTPRequest;
export type Response<T = any> = HTTPResponse<T>;

export class HTTPDataSource extends ApolloHTTPDataSource {
  private memoizeLoaderCache = new Map<string, DataLoader<string, unknown>>();
  requestOptions: RequestOptions = {};

  constructor(baseURL: string, options?: HTTPDataSourceConfig) {
    const { clientOptions, requestOptions, ...rest } = options ?? {};
    super(baseURL, {
      clientOptions: {
        bodyTimeout: 10000,
        headersTimeout: 10000,
        ...(clientOptions ? { ...clientOptions } : {}),
      },
      ...(rest ? { ...rest } : {}),
    });

    this.requestOptions = {
      requestCache: {
        maxTtl: 21600, // 6 hours --- The maximum time an item is cached in seconds.
        maxTtlIfError: 3600, // 1 hour --- The maximum time the cache should be used when the re-fetch from the origin fails.
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      ...(requestOptions ? { ...requestOptions } : {}),
    };
  }

  protected async memoizedGet<T = unknown>(
    path: string,
    query: { query: string; variables: string }
  ) {
    // generate a unique key for each request like onCacheKeyCalculation
    const cacheKey = path + " " + JSON.stringify(query);
    // check if data loader exists
    let loader = this.memoizeLoaderCache.get(cacheKey) as DataLoader<string, T>;
    if (!loader) {
      // create data loader for the cache key
      loader = new DataLoader<string, T>(async (keys: readonly string[]) => {
        const result = await this.get<T>(path, {
          ...this.requestOptions,
          query,
        });
        return keys.map(() => result.body);
      });
      this.memoizeLoaderCache.set(cacheKey, loader);
    }

    // register the request
    return loader.load(cacheKey);
  }
}
