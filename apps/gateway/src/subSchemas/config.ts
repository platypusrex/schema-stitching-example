export interface ServiceConfig {
  name: string;
  url: string;
  port: number;
  federated?: boolean
}

export const services: ServiceConfig[] = [
  {
    name: "musician-service",
    url: "http://localhost:4001/graphql",
    port: 4001,
  },
  {
    name: "band-service",
    url: "http://localhost:4002/graphql",
    port: 4002,
  },
  {
    name: "genre-service",
    url: "http://localhost:4003/graphql",
    port: 4003,
  },
  {
    name: "instrument-service",
    url: "http://localhost:4004/graphql",
    port: 4004,
  },
  {
    name: "fan-service",
    url: "http://localhost:4005/graphql",
    federated: true,
    port: 4005,
  },
];
