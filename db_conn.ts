import { MongoClient } from "mongodb";

let cachedClient: MongoClient;
let cachedDb: any; // db can change

export async function connectToDatabase() {
	let uri = process.env.MONGODB_URI;

	if (!uri) {
		throw new Error(
			"Please define the MONGODB_URI environment variable inside .env.local"
		);
	}

	if (cachedClient && cachedDb) {
		return { client: cachedClient, db: cachedDb };
	}

	const client = await MongoClient.connect(uri);

	const db = await client.db();

	cachedClient = client;
	cachedDb = db;

	return { client, db };
}
