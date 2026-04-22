import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error("Missing process.env.MONGODB_URI")
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  }
}

export async function connectDB() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        maxPoolSize: 10,
      })
      .then(mongooseInstance => {
        console.log("connected!")
        return mongooseInstance
      })
  }

  cached.conn = await cached.promise
  return cached.conn
}

export function isValidObjectId(id) {
  return mongoose.isValidObjectId(id)
}

export function castToObjectId(string) {
  return new mongoose.Types.ObjectId(string)
}

// TODO: replace for more security
// https://github.com/yahoo/serialize-javascript
export function jparse(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export default async function db(req, res, next) {
  try {
    await connectDB()
  } catch (e) {
    console.error(e)
  }
  return next()
}
