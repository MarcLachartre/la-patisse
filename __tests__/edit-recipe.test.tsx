const { MongoClient } = require('mongodb');

import { ObjectId } from 'mongodb';
import { RecipesController } from '../controllers/recipes-controller';
import { Database } from '../database/database';
import { RecipeModel } from '../models/recipe-model';

//test db

let connection: any;
let db: any;

const filter = {
    _id: new ObjectId('65b3a78f245916bd675849ea'),
};

beforeAll(async () => {
    connection = await MongoClient.connect(
        `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/myCakesTestDb?authSource=${process.env.DB_AUTH}`
    );
    db = await connection.db('myCakesTestDb');
});

afterAll(async () => {
    const filter = {
        _id: new ObjectId('65b3a78f245916bd675849ea'),
    };
    const updatedDocument = { name: 'gateau' };
    await db.collection('cakes').updateOne(filter, {
        $set: updatedDocument,
    });
    await connection.close();
});

describe('update recipe in mongodb', () => {
    it('should update the name of a recipe cake into collection', async () => {
        const updatedDocument = { name: 'cake' };

        await Database.updateData(filter, updatedDocument, 'cakes');

        const cakes = await db.collection('cakes');
        const updatedCake = await cakes.findOne(filter);

        expect(updatedCake.name).toEqual('cake');
    });
});

describe('test updateRecipe method in recipe model', () => {
    it('should return an object of the id of the modified recipe and success true', async () => {
        const updatedDocument = {
            name: 'madeleine',
            timestamp: String(Date.now()),
        };

        const response = await RecipeModel.updateRecipe(
            updatedDocument,
            '65b3a78f245916bd675849ea'
        );

        const cakes = await db.collection('cakes');
        const updatedCake = await cakes.findOne(filter);

        expect(response).toEqual({
            filter: { _id: new ObjectId('65b3a78f245916bd675849ea') },
            success: true,
        });
        expect(updatedCake.name).toEqual('madeleine');
    });

    it('should return an object with success false', async () => {
        const updatedDocument = {
            name: 'madeleine',
            timestamp: String(Date.now()),
        };
        const errorResponse = await RecipeModel.updateRecipe(
            updatedDocument,
            '111111111111111111111111'
        );

        expect(errorResponse).toEqual({
            filter: {
                _id: new ObjectId('111111111111111111111111'),
            },
            success: false,
            error: 'Issue finding database document: filter didn`t find document in the provided collection ({matchedCount:0})',
        });
    });
});

describe('test Update method in recipes controller', () => {
    it("should return an object filter: { _id: new ObjectId('65b3a78f245916bd675849ea')},success: true", async () => {
        const updatedDocument = {
            name: 'tarte',
            timestamp: String(Date.now()),
        };
        const response = await new RecipesController().update(
            '65b3a78f245916bd675849ea',
            updatedDocument
        );

        expect(response).toEqual({
            filter: { _id: new ObjectId('65b3a78f245916bd675849ea') },
            success: true,
        });
    });
});
