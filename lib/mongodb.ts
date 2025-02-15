import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/ekagrata";

if (!uri) {
  throw new Error(
    "Please define the MONGO_URI environment variable inside .env",
  );
}

let client = new MongoClient(uri);
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable to preserve value across module reloads
  if (!(global as any)._mongoClientPromise) {
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export default clientPromise;
