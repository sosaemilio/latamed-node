import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'
dotenv.config()

let db: any

const initDb = (callback: any): void => {
  if (db !== null && db !== undefined) {
    console.log('Db is already initialized!')
    return callback(null, db)
  }
  const atlasUri = process.env.ATLAS_URI ?? '' // Ensure ATLAS_URI is defined or use an empty string as fallback
  MongoClient.connect(atlasUri)
    .then((client) => {
      db = client
      callback(null, db)
    })
    .catch((err) => {
      callback(err)
    })
}

const getDb = (): any => {
  if (db === null || db === undefined) {
    throw Error('Db not initialized')
  }
  return db
}

export default {
  initDb,
  getDb
}
