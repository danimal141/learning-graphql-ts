import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import fs from 'fs'
import path from 'path'
import resolvers from './resolvers'

const typeDefs = fs.readFileSync(path.join(__dirname, '../../graphql/schema.graphql')).toString()
const app = express()
const server = new ApolloServer({
  typeDefs,
  resolvers
})

app.get('/', (_req, res) => res.end('Welcome!'))
app.listen({ port: 4000 }, () => console.log(`Server running @ localhost:4000${server.graphqlPath}`))
