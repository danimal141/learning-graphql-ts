import 'reflect-metadata'

import { ApolloServer } from 'apollo-server-express'
import expressPlayground from 'graphql-playground-middleware-express'
import express from 'express'
import { buildSchema } from 'type-graphql'
import path from 'path'

import dbSetup from './dbSetup'
import resolvers from './resolvers'

(async () => {
  const app = express()
  const schema = await buildSchema({
    resolvers: resolvers,
    emitSchemaFile: path.resolve(__dirname, '../schema.gql')
  })
  const context = { db: await dbSetup() }
  const server = new ApolloServer({ schema, context })

  server.applyMiddleware({ app })

  app.get('/', (_req, res) => res.end('Welcome!'))
  app.get('/playground', expressPlayground({ endpoint: server.graphqlPath }))
  app.listen({ port: 4000 }, () => console.log(`Server running @ localhost:4000${server.graphqlPath}`))
})()
