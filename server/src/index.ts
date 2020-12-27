import "reflect-metadata";

import { ApolloServer } from "apollo-server-express";
import { Context } from "apollo-server-core";
import { createConnection, getConnectionOptions } from "typeorm";
import expressPlayground from "graphql-playground-middleware-express";
import express from "express";
import { IncomingMessage } from "http";
import { buildSchema } from "type-graphql";
import path from "path";
import dotenv from "dotenv";

import User from "./entities/User";
import resolvers from "./resolvers";

export type ContextRequest = { req: IncomingMessage };
export interface AuthContext extends Context {
  currentUser: User | null;
}

dotenv.config({ path: path.join(__dirname, "../../server/.env") });

(async () => {
  await createConnection(await getConnectionOptions());

  const app = express();
  const schema = await buildSchema({
    resolvers: resolvers,
    emitSchemaFile: path.resolve(__dirname, "../schema.gql"),
  });
  const context = async ({ req }: ContextRequest) => {
    const token = req.headers.authorization;
    const currentUser = await User.findOne({ githubToken: token });
    return { currentUser };
  };
  const server = new ApolloServer({ schema, context });

  server.applyMiddleware({ app });

  app.get("/", (_req, res) => res.end("Welcome!"));
  app.get("/playground", expressPlayground({ endpoint: server.graphqlPath }));
  app.listen({ port: 4000 }, () =>
    console.log(`Server running @ localhost:4000${server.graphqlPath}`)
  );
})();
