const { MongoClient, ServerApiVersion } = require('mongodb');

declare global {
	var _mongoClientPromise: any;
}

const getData = async () => {
	const options = {
		serverApi: {
			version: ServerApiVersion.v1,
			strict: true,
			deprecationErrors: true,
		},
	};

	interface Data {
		recipes: [];
	}

	const data = {} as Data;

	let clientPromise;

	// console.log(global._mongoClientPromise);
	if (!global._mongoClientPromise) {
		console.log('open connection');

		const client = new MongoClient(
			// Local mongo client
			`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/myCakes?authSource=${process.env.DB_AUTH}`

			// Atlas mongo client
			// `mongodb+srv://${process.env.DB_ATLAS_USER}:${process.env.DB_ATLAS_PASS}@${process.env.DB_ATLAS_HOST}/myCakes?authSource=${process.env.DB_ATLAS_AUTH}`,
			// options
		);

		global._mongoClientPromise = await client.connect();
	}
	// delete global._mongoClientPromise;
	// clientPromise.close();
	clientPromise = global._mongoClientPromise;

	// Retrieve cakes collection for test purposes:

	const recipes: any = await clientPromise
		.db('myCakesTestDb')
		.collection('cakes');

	// Retrieve cakes collection for developpement and production purposes:

	// const recipes: any = await clientPromise.db('myCakes').collection('cakes');

	// Set mongodb data obj recipes to cakes retrieved from db
	data.recipes = recipes;

	return data;
};

export { getData };
