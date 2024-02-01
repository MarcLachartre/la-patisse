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
        const updatedDocument = { name: 'madeleine' };
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
        const updatedDocument = { name: 'madeleine' };
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
        const updatedDocument = { name: 'tarte' };
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
//editeRecipe(recipe) has a recipe as a parameter. we take the id

// test controller

// describe('updateData function should save and return the inserted data', () => {
//     let connection: any;
//     let db: any;

//     afterAll(async () => {
//         // delete inserted cake for test
//         connection = await MongoClient.connect(
//             `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/myCakes?authSource=${process.env.DB_AUTH}`
//         );

//         db = await connection.db('myCakes');
//         const cakes = db.collection('cakes');

//         await cakes.deleteOne({
//             name: 'Gateau au chocolat',
//         });
//         await connection.close();
//     });

//     it('should insert a cake into collection', async () => {
//         const data = { name: 'Gateau au chocolat' };
//         const insertedData = await Database.insertData(data);
//         expect(insertedData.success).toEqual(true);
//     });
// });

// // - A save recipe function in the model that returns success or error
// describe('saveRecipe method in the recipe model should save a recipe', () => {
//     afterAll(async () => {
//         // delete inserted cake for test
//         const connection = await MongoClient.connect(
//             `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/myCakes?authSource=${process.env.DB_AUTH}`
//         );

//         const db = await connection.db('myCakes');
//         const cakes = db.collection('cakes');

//         await cakes.deleteOne({
//             name: "Cake à l'amour",
//         });
//         await connection.close();
//     });

//     it('should insert a cake into the cakes collection', async () => {
//         const recipe = {
//             name: "Cake à l'amour",
//             ingredients: [
//                 {
//                     quantity: 400,
//                     unit: 'g',
//                     preposition: "d'",
//                     type: 'amour',
//                 },
//             ],
//             tools: [
//                 'Four',
//                 'Deux moules à cake de 20 ou 22cm (en silicone de préférence)',
//             ],
//             recipe: [
//                 'Commencer par zester les citrons puis melanger avec le sucre. En parallèle, faire fondre le beurre dans un bol.',
//                 'Enjoy ya cake!',
//             ],
//             description: 'Aaaaah',
//             pictureURL:
//                 'https://res.cloudinary.com/cul/image/upload/v1697644668/La%20Patisse/cake-au-citron_pgwhlb.png',
//         };
//         const insertedData = await RecipeModel.saveRecipe(recipe);
//         expect(insertedData.success).toEqual(true);
//     });
// });

// - A create recipe function in the controller
// describe('create method in the controller should save a recipe', () => {
//     afterAll(async () => {
//         // delete inserted cake for test
//         const connection = await MongoClient.connect(
//             `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/myCakes?authSource=${process.env.DB_AUTH}`
//         );

//         const db = await connection.db('myCakes');
//         const cakes = db.collection('cakes');

//         await cakes.deleteOne({
//             name: 'Cake pas bon',
//         });
//         await connection.close();
//     });

// it('should create a cake', async () => {
//     const recipe = {
//         name: 'Cake pas bon',
//         ingredients: [
//             {
//                 quantity: 400,
//                 unit: 'g',
//                 preposition: 'de',
//                 type: 'miel',
//             },
//         ],
//         tools: [
//             'Four',
//             'Deux moules à cake de 20 ou 22cm (en silicone de préférence)',
//         ],
//         recipe: [
//             'Commencer par zester les citrons puis melanger avec le sucre. En parallèle, faire fondre le beurre dans un bol.',
//             'Enjoy ya cake!',
//         ],
//         description: 'Aaaaah',
//         picture: new File(['pic'], 'pic.jpg', {}),
//     };
//     const insertedData = await new RecipesController().create(recipe);
//     expect(insertedData.success).toEqual(true);
// });
// });
