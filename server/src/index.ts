import 'reflect-metadata'

import { ApolloServer } from 'apollo-server-express'
import expressPlayground from 'graphql-playground-middleware-express'
import express from 'express'
import { IncomingMessage } from 'http'
import { buildSchema } from 'type-graphql'
import path from 'path'

import User from './entities/User'
import dbSetup from './dbSetup'
import resolvers from './resolvers'

export type ContextRequest = { req: IncomingMessage }
export interface AppContext {
  currentUser: User | null
}

(async () => {
  const app = express()
  const schema = await buildSchema({
    resolvers: resolvers,
    emitSchemaFile: path.resolve(__dirname, '../schema.gql')
  })
  const db = await dbSetup()
  const context = async ({ req }: ContextRequest) => {
    const token = req.headers.authorization
    const currentUser = await User.findOne({ githubToken: token })
    return { db, currentUser }
  }
  const server = new ApolloServer({ schema, context })

  server.applyMiddleware({ app })

  app.get('/', (_req, res) => res.end('Welcome!'))
  app.get('/playground', expressPlayground({ endpoint: server.graphqlPath }))
  app.listen({ port: 4000 }, () => console.log(`Server running @ localhost:4000${server.graphqlPath}`))
})()
