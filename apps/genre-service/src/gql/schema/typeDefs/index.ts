import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";

const typeDefsArray = loadFilesSync(path.join(process.cwd(), "."), {
  extensions: ["graphql"],
  ignoreIndex: true,
});

export const typeDefs = mergeTypeDefs(typeDefsArray);
