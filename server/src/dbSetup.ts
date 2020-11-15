import path from 'path'
import dotenv from 'dotenv'
import { createConnection, BaseEntity } from 'typeorm'
import entities from './entities'

dotenv.config({ path: path.join(__dirname, '../../.env') })

const dbSetup = async () => {
  const conn = await createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: entities,
    synchronize: false, // Using `synchronize` in Production is dangerous!
    logging: true,
    dropSchema: false,
    cache: true,
  })
  BaseEntity.useConnection(conn)
  return conn
}

export default dbSetup
