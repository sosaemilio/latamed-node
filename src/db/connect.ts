import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'
dotenv.config()

let db: any

const initDb = (callback: (err: Error | null, db: any) => void) => {
  if (db !== undefined && db !== null) {
    console.log('Db is already initialized!')
    callback(null, db); return
  }
  MongoClient.connect(process.env.ATLAS_URI)
    .then((client) => {
      db = client
      callback(null, db)
    })
    .catch((err) => {
      callback(err)
    })
}

const getDb = () => {
  if (!db) {
    throw Error('Db not initialized')
  }
  return db
}

module.exports = {
  initDb,
  getDb
}
