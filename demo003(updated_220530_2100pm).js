const {MongoClient, ServerApiVersion} = require('mongodb');

async function main() {
    // Connection with MongoDB....
    const uri ="mongodb+srv://purekorea:node1234@cluster0.jcomwxz.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    // nodeconst client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    try {
        await client.connect();
        //--------------------------------------------------------------------------
        // to see all DBs in the MongoDB Cluster.
        // await listDatabases(client);
        /*--------------------------------------------------------------------------
        await createListing(client, {
            Title: "Titanic 2",
            ReleaseYear: 2023,
            RunTime: 180,
            DirectorName: "James Cameron" 
        });
        -----------------------------------------------------------------------------
        */
        await createMultipleListings(client, [
        {
            Title: "Titanic 2",
            ReleaseYear: 2023,
            RunTime: 180,
            DirectorName: "James Cameron" 
        },
        {
            Title: "Frozon 3",
            ReleaseYear: 2024,
            RunTime: 121,
            DirectorName: "Christopher Buck" 
        }
    ]);


    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
        // console.log('Connection on program has COMPLETED...');
    }
}

main().catch(console.error);

//-----------------------CREATE functions--------------------------------//

// 1) Sing Line listing Creating....
async function createListing(client, newListing) {
    const result = await client.db("movie_collection_database").collection("movies").insertOne(newListing);

    console.log(`New listing created with the following id: ${result.insertedId}`);
}

// 2) Multiple Line listing Creating....
async function createMultipleListings(client, newListings) {
    const result = await client.db("movie_collection_database").collection("movies").insertMany(newListings);

    console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
    console.log(result.insertedIds);
}

// 3) to see all DBs in the MongoDB Cluster - MongoDB_Database listing Reserching....
async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => {
        console.log(`- ${db.name}`);
    });
}