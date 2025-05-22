import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable in .env.local');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend globalThis with your cache type
declare global {
  const mongooseCache: MongooseCache | undefined;
}

// Use globalThis for better type safety
const globalWithCache = globalThis as typeof globalThis & {
  mongooseCache?: MongooseCache;
};

const cached = (globalWithCache.mongooseCache ??= { conn: null, promise: null });

async function connectDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDatabase;
