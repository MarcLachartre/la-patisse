const { MongoClient, ServerApiVersion } = require('mongodb');
import type { MongoClient as MongoClientType } from 'mongodb';

declare global {
    var _mongoClient: MongoClientType;
    var _connectionTimer: ReturnType<typeof setTimeout>;
    var _connectionIsOpen: boolean;
}

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

        if (!global._mongoClient) {
            try {
                console.log('open connection');
                process.env.ENVIRONMENT === 'development'
                    ? console.log(true)
                    : console.log(false);
                const client = await new MongoClient(
                    process.env.ENVIRONMENT === 'development'
                        ? `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/myCakes?authSource=${process.env.DB_AUTH}`
                        : `mongodb+srv://${process.env.DB_ATLAS_USER}:${process.env.DB_ATLAS_PASS}@${process.env.DB_ATLAS_HOST}/myCakes?authSource=${process.env.DB_ATLAS_AUTH}`,

                    // Local mongo client
                    // `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/myCakes?authSource=${process.env.DB_AUTH}`,

                    // Atlas mongo client
                    options
                );
                global._mongoClient = await client.connect();
                global._connectionIsOpen = true;
            } catch (error) {
                console.log('error connecting to db');
                console.log(error);
                global._connectionIsOpen = false;
            }
        } else {
        }

        const setConnectionTimeout = () => {
            global._connectionTimer = setTimeout(async () => {
                await global._mongoClient.close();
                global._connectionIsOpen = false;
                clearTimeout(global._connectionTimer);
            }, 600000);
        };

        if (global._connectionIsOpen) {
            clearTimeout(global._connectionTimer);
        } else {
            await global._mongoClient.connect();
            global._connectionIsOpen = true;
        }

        setConnectionTimeout();
        clientPromise = global._mongoClient;

        // Retrieve cakes db for developpement and production purposes:
        const db = clientPromise.db('myCakes');

        // Retrieve cakes db for test purposes:
        // const db = await clientPromise.db('myCakesTestDb');
        return db;
    }

    static async getData(collection: string) {
        const data = {} as any;

        const db = await this.connectToDB();
        const allData: any = db.collection(collection);

        // Set mongodb data obj recipes to cakes retrieved from db
        data.recipes = await allData;

        return data;
    }

    static async insertData(collection: string, dataToInsert: any) {
        try {
            const db = await this.connectToDB();
            const data: any = db.collection(collection);
            const dataInserted = await data.insertOne(dataToInsert);

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
            const collection = db.collection(collectionName);

            const response = await collection.updateOne(filter, {
                $set: data,
            });
            const isModified =
                response.matchedCount === 1
                    ? {
                          id: filter._id.toString(), // Necessary to get the recipe id and redirect to the recipe url containing this id
                          filter,
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
