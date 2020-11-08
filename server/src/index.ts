import { ApolloServer } from 'apollo-server'
import fs from 'fs'
import path from 'path'
import resolvers from './resolvers'

const typeDefs = fs.readFileSync(path.join(__dirname, '../../graphql/schema.graphql')).toString()

const server = new ApolloServer({
  typeDefs,
  resolvers
})
server.listen().then(({ url }) => console.log(`Service running on ${url}`))
