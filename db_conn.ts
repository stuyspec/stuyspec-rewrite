import { MongoClient } from "mongodb";

export async function connectToDatabase() {
	let uri = process.env.MONGODB_URI;

	let cachedClient = null;
	let cachedDb = null;

	if (!uri) {
		throw new Error(
			"Please define the MONGODB_URI environment variable inside .env.local"
		);
	}

	if (cachedClient && cachedDb) {
		return { client: cachedClient, db: cachedDb };
	}

	const client = MongoClient.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	const db = await client.db();

	cachedClient = client;
	cachedDb = db;

	return { client, db };
}
