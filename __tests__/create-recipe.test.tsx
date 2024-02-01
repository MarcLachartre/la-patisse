const { MongoClient } = require('mongodb');

import { RecipesController } from '../controllers/recipes-controller';
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
            `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/myCakes?authSource=${process.env.DB_AUTH}`
        );
        db = await connection.db('myCakesTestDb');
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
        // delete inserted cake for test
        connection = await MongoClient.connect(
            `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/myCakes?authSource=${process.env.DB_AUTH}`
        );

        db = await connection.db('myCakesTestDb');
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
describe('saveRecipe method in the recipe model should save a recipe', () => {
    afterAll(async () => {
        // delete inserted cake for test
        const connection = await MongoClient.connect(
            `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/myCakes?authSource=${process.env.DB_AUTH}`
        );

        const db = await connection.db('myCakesTestDb');
        const cakes = db.collection('cakes');

        await cakes.deleteOne({
            name: "Cake à l'amour",
        });
        await connection.close();
    });

    it('should insert a cake into the cakes collection', async () => {
        const recipe = {
            name: "Cake à l'amour",
            ingredients: [
                {
                    quantity: 400,
                    unit: 'g',
                    preposition: "d'",
                    type: 'amour',
                },
            ],
            tools: [
                'Four',
                'Deux moules à cake de 20 ou 22cm (en silicone de préférence)',
            ],
            recipe: [
                'Commencer par zester les citrons puis melanger avec le sucre. En parallèle, faire fondre le beurre dans un bol.',
                'Enjoy ya cake!',
            ],
            description: 'Aaaaah',
            pictureURL:
                'https://res.cloudinary.com/cul/image/upload/v1697644668/La%20Patisse/cake-au-citron_pgwhlb.png',
        };
        const insertedData = await RecipeModel.saveRecipe(recipe);
        expect(insertedData.success).toEqual(true);
    });
});

// - A create recipe function in the controller
describe('create method in the controller should save a recipe', () => {
    afterAll(async () => {
        // delete inserted cake for test
        const connection = await MongoClient.connect(
            `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/myCakes?authSource=${process.env.DB_AUTH}`
        );

        const db = await connection.db('myCakesTestDb');
        const cakes = db.collection('cakes');

        await cakes.deleteOne({
            name: 'Cake pas bon',
        });
        await connection.close();
    });

    it('should create a cake', async () => {
        const recipe = {
            name: 'Cake pas bon',
            ingredients: [
                {
                    quantity: 400,
                    unit: 'g',
                    preposition: 'de',
                    type: 'miel',
                },
            ],
            tools: [
                'Four',
                'Deux moules à cake de 20 ou 22cm (en silicone de préférence)',
            ],
            recipe: [
                'Commencer par zester les citrons puis melanger avec le sucre. En parallèle, faire fondre le beurre dans un bol.',
                'Enjoy ya cake!',
            ],
            description: 'Aaaaah',
            picture: new File(['pic'], 'pic.jpg', {}),
        };
        const insertedData = await new RecipesController().create(recipe);
        expect(insertedData.success).toEqual(true);
    });
});
