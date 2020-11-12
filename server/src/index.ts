import { ApolloServer } from 'apollo-server-express'
import expressPlayground from 'graphql-playground-middleware-express'
import express from 'express'
import fs from 'fs'
import path from 'path'

import dbSetup from './dbSetup'
import resolvers from './resolvers'

const typeDefs = fs.readFileSync(path.join(__dirname, '../../graphql/schema.graphql')).toString()
const app = express()
const server = new ApolloServer({
  typeDefs,
  resolvers
})
server.applyMiddleware({ app })

app.get('/', (_req, res) => res.end('Welcome!'))
app.get('/playground', expressPlayground({ endpoint: server.graphqlPath }))

dbSetup().then(() => {
  app.listen({ port: 4000 }, () => console.log(`Server running @ localhost:4000${server.graphqlPath}`))
})

