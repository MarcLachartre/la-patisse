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

        // Retrieve cakes collection for test purposes:

        // const recipes: any = await clientPromise
        // 	.db('myCakesTestDb')
        // 	.collection('cakes');

        // Retrieve cakes collection for developpement and production purposes:
        const db = await clientPromise.db('myCakes');
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
            return { success: false };
        }
    }
}

export { Database };
