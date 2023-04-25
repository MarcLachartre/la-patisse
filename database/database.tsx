// const MongoClient = require('mongodb').MongoClient;

// const getData = async () => {
// 	const options = {
// 		useUnifiedTopology: true,
// 		useNewUrlParser: true,
// 	};

// 	const client = new MongoClient(
// 		// Local mongo client
// 		// `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/myCakes?authSource=${process.env.DB_AUTH}`

// 		// Atlas mongo client
// 		`mongodb+srv://${process.env.DB_ATLAS_USER}:${process.env.DB_ATLAS_PASS}@${process.env.DB_ATLAS_HOST}/myCakes?authSource=${process.env.DB_ATLAS_AUTH}`,
// 		options
// 	);

// 	interface Data {
// 		recipes: [];
// 		// client: any;
// 	}

// 	const data = {} as Data;
// 	// try {
// 	// Connect to db
// 	await client.connect();

// 	//

// 	// Retrieve cakes collection for test purposes:
// 	// const recipes: any = await client
// 	// 	.db('myCakesTestDb')
// 	// 	.collection('cakes');

// 	// Retrieve cakes collection for developpement and production purposes:
// 	const recipes: any = await client.db('myCakes').collection('cakes');
// 	// Set mongodb data obj recipes to cakes retrieved from db
// 	data.recipes = recipes;
// 	// data.client = client;
// 	// } catch (error) {
// 	// 	console.error(error);
// 	// }

// 	return data;
// };

// export { getData };

///////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////::

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri =
// 	'mongodb+srv://herokuserver:oAhWRho1XvXSlDLI@cluster0.val0amt.mongodb.net/?retryWrites=true&w=majority';
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
// 	serverApi: {
// 		version: ServerApiVersion.v1,
// 		strict: true,
// 		deprecationErrors: true,
// 	},
// });
// async function getData() {
// 	// Connect the client to the server	(optional starting in v4.7)
// 	await client.connect();
// 	// Send a ping to confirm a successful connection
// 	const a = await client.db('myCakes').collection('cakes');
// 	// .findOne({ name: 'Carrot Cake' });
// 	console.log(
// 		'Pinged your deployment. You successfully connected to MongoDB!'
// 	);
// 	return a;
// }
// // run().catch(console.dir);

// export { getData };

///////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////::

// const MongoClient = require('mongodb').MongoClient;

// const getData = async () => {
// 	const options = {
// 		useUnifiedTopology: true,
// 		useNewUrlParser: true,
// 	};

// 	const client = new MongoClient(
// 		// Local mongo client
// 		// `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/myCakes?authSource=${process.env.DB_AUTH}`

// 		// Atlas mongo client
// 		`mongodb+srv://${process.env.DB_ATLAS_USER}:${process.env.DB_ATLAS_PASS}@${process.env.DB_ATLAS_HOST}/myCakes?authSource=${process.env.DB_ATLAS_AUTH}`,
// 		options
// 	);

// 	interface Data {
// 		recipes: [];
// 		// client: any;
// 	}

// 	let clientPromise;

// 	if (!global._mongoClientPromise) {
// 		console.log('open connection');

// 		const client = new MongoClient(
// 			// Local mongo client
// 			// `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/myCakes?authSource=${process.env.DB_AUTH}`

// 			// Atlas mongo client
// 			`mongodb+srv://${process.env.DB_ATLAS_USER}:${process.env.DB_ATLAS_PASS}@${process.env.DB_ATLAS_HOST}/myCakes?authSource=${process.env.DB_ATLAS_AUTH}`,
// 			options
// 		);

// 		global._mongoClientPromise = await client.connect();
// 	}

// 	clientPromise = global._mongoClientPromise;
// 	// console.log(!global._a);
// 	// clientPromise = await client.connect();
// 	// client.close();
// 	const data = {} as Data;
// 	// try {
// 	// Connect to db

// 	//

// 	// Retrieve cakes collection for test purposes:
// 	// const recipes: any = await client
// 	// 	.db('myCakesTestDb')
// 	// 	.collection('cakes');

// 	// Retrieve cakes collection for developpement and production purposes:
// 	const recipes: any = await clientPromise.db('myCakes').collection('cakes');
// 	// Set mongodb data obj recipes to cakes retrieved from db
// 	data.recipes = recipes;
// 	// data.client = client;
// 	// } catch (error) {
// 	// 	console.error(error);
// 	// }

// 	return data;
// };

// export { getData };

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
			// `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/myCakes?authSource=${process.env.DB_AUTH}`

			// Atlas mongo client
			`mongodb+srv://${process.env.DB_ATLAS_USER}:${process.env.DB_ATLAS_PASS}@${process.env.DB_ATLAS_HOST}/myCakes?authSource=${process.env.DB_ATLAS_AUTH}`,
			options
		);

		global._mongoClientPromise = await client.connect();
	}
	// delete global._mongoClientPromise;
	// clientPromise.close();
	clientPromise = global._mongoClientPromise;

	// Retrieve cakes collection for test purposes:

	// const recipes: any = await client
	// 	.db('myCakesTestDb')
	// 	.collection('cakes');

	// Retrieve cakes collection for developpement and production purposes:

	const recipes: any = await clientPromise.db('myCakes').collection('cakes');

	// Set mongodb data obj recipes to cakes retrieved from db
	data.recipes = recipes;

	return data;
};

export { getData };
