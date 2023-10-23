import { insertData } from 'database/database';

// what to test?

// - A post data function in the database:
// - test mongo db connection
// - test saving recipe

const { MongoClient } = require('mongodb');

describe('insert cake in mongodb', () => {
	let connection: any;
	let db: any;

	beforeAll(async () => {
		connection = await MongoClient.connect(
			`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/myCakes?authSource=${process.env.DB_AUTH}`,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		);
		db = await connection.db('myCakes');
	});

	afterAll(async () => {
		await connection.close();
	});

	it('should insert a cake into collection', async () => {
		const cakes = db.collection('cakes');

		const mockCake = { name: 'Gateau au chocolat' };
		await cakes.insertOne(mockCake);

		const insertedCake = await cakes.findOne({
			name: 'Gateau au chocolat',
		});
		expect(insertedCake).toEqual(mockCake);
		await cakes.deleteOne({
			name: 'Gateau au chocolat',
		});
	});
});

describe('insertData function should save and return the inserted data', () => {});
// - A save recipe function in the model that returns success or error

// - A create recipe function in the controller

// - a route that accepts a post function saving a pic and that takes in request
