import { MongoClient, Db } from "mongodb";
declare global {
	var client: MongoClient;
	var db: Db;
}
// Global vars are used because ANYTHING else is cleared/forgotten when the file is RE-imported
export async function connectToDatabase() {
	if (!global.client) {
		let uri = process.env.MONGODB_URI;
		if (!uri) {
			throw new Error(
				"Please define the MONGODB_URI environment variable inside .env.local"
			);
		}
		global.client = await MongoClient.connect(uri);
		global.db = await client.db();
		console.log("Reconnected");
	}
	return { client: global.client, db: global.db };
}
