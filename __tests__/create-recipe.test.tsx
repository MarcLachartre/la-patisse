const { MongoClient } = require('mongodb');
import { Database } from '../database/database';
import { RecipeModel } from '../models/recipe-model';
// what to test?

// - A post data function in the database:
// - test mongo db connection
// - test saving recipe

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

		const mockCake = { name: 'Gateau au citron' };
		await cakes.insertOne(mockCake);

		const insertedCake = await cakes.findOne({
			name: 'Gateau au citron',
		});
		expect(insertedCake).toEqual(mockCake);
		await cakes.deleteOne({
			name: 'Gateau au citron',
		});
	});
});

describe('insertData function should save and return the inserted data', () => {
	let connection: any;
	let db: any;

	afterAll(async () => {
		// deleted inserted cake for test
		connection = await MongoClient.connect(
			`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/myCakes?authSource=${process.env.DB_AUTH}`,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		);

		db = await connection.db('myCakes');
		const cakes = db.collection('cakes');

		await cakes.deleteOne({
			name: 'Gateau au chocolat',
		});
		await connection.close();
	});

	it('should insert a cake into collection', async () => {
		const data = { name: 'Gateau au chocolat' };
		const insertedData = await Database.insertData(data);
		expect(insertedData.success).toEqual(true);
	});
});

// - A save recipe function in the model that returns success or error
describe('saveRecipe method should save a recipe', () => {
	// it('should insert a cake into collection', async () => {
	// 	const recipe = { name: 'Gateau au chocolat' };
	// 	const insertedData = await RecipeModel.saveRecipe(data);
	// 	expect(insertedData.success).toEqual(true);
	// });
});

// - A create recipe function in the controller

// - a route that accepts a post function saving a pic and that takes in request
