import { ObjectId } from 'mongodb';

const { MongoClient, ServerApiVersion } = require('mongodb');

declare global {
    var _mongoClientPromise: any;
}
// console.log(new MongoClient());

class Database {
    constructor() {}

    private static async connectToDB() {
        const options = {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
        };

        let clientPromise;

        // console.log(global._mongoClientPromise);
        if (!global._mongoClientPromise) {
            console.log('open connection');

            const client = new MongoClient(
                // Local mongo client
                `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/myCakes?authSource=${process.env.DB_AUTH}`,

                // Atlas mongo client
                // `mongodb+srv://${process.env.DB_ATLAS_USER}:${process.env.DB_ATLAS_PASS}@${process.env.DB_ATLAS_HOST}/myCakes?authSource=${process.env.DB_ATLAS_AUTH}`,
                options
            );
            global._mongoClientPromise = await client.connect();
        }
        // delete global._mongoClientPromise;
        // clientPromise.close();
        clientPromise = global._mongoClientPromise;

        // Retrieve cakes db for developpement and production purposes:
        // const db = await clientPromise.db('myCakes');

        // Retrieve cakes db for test purposes:
        const db = await clientPromise.db('myCakesTestDb');
        return db;
    }

    static async getData() {
        const data = {} as any;

        const db = await this.connectToDB();
        const recipes: any = db.collection('cakes');

        // Set mongodb data obj recipes to cakes retrieved from db
        data.recipes = recipes;

        return data;
    }

    static async insertData(data: any) {
        try {
            const db = await this.connectToDB();
            const recipes: any = db.collection('cakes');
            const dataInserted = await recipes.insertOne(data);

            const isInserted = {
                id: await dataInserted.insertedId.toString(), // Necessary to get the recipe id and redirect to the recipe url containing this id
                success: true,
            };

            return isInserted;
        } catch (error) {
            console.log(error);
            return { success: false, error: 'Database issue' };
        }
    }

    static async updateData(filter: any, data: any, collectionName: string) {
        try {
            const db = await this.connectToDB();
            const collection = await db.collection(collectionName);

            const response = await collection.updateOne(filter, {
                $set: data,
            });
            const isModified =
                response.matchedCount === 1
                    ? {
                          filter, // Necessary to get the recipe id and redirect to the recipe url containing this id
                          success: true,
                      }
                    : {
                          filter,
                          success: false,
                          error: 'Issue finding database document: filter didn`t find document in the provided collection ({matchedCount:0})',
                      };

            return isModified;
        } catch (error) {
            console.log(error);
            return { filter, success: false, error: 'Database error' };
        }
    }
}

export { Database };
