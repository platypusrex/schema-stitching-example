import { dateScalar } from "custom-scalars";
import { Resolvers } from "../../../typings/resolvers";

const scalarResolvers: Resolvers = {
  Date: dateScalar,
};

export default scalarResolvers;
