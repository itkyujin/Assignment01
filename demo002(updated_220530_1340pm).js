const {MongoClient, ServerApiVersion} = require('mongodb');

async function main() {
    const uri ="mongodb+srv://purekorea:node1234@cluster0.jcomwxz.mongodb.net/?retryWrites=true&w=majority";

    const client = new MongoClient(uri, { useUnifiedTopology: true });
    // nodeconst client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    try {
        await client.connect();
        // to see all DBs in the MongoDB Cluster.
        // await listDatabases(client);

        //-----------------------CREATE-----------------------------------------//
        //1) Sing line listing...
        /*
        await createListing(client, {
            title: "Titanic",
            release_year: 1997,
            run_time: 194.00,
            director_id: 1 
        })
        */





    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
        // console.log('Connection on program has COMPLETED...');
    }
}

main().catch(console.error);

async function createListing(client, newListing) {
    const result = await client.db("movie_collection_database").collection("movies").insertOne(newListing);

    console.log(`New listing created with the following id: ${result.insertedId}`);
}

async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => {
        console.log(`- ${db.name}`);
    });

}

//--------------------------CREATE functions--------------------------------//

// 1) Sing Line Creating....
async function createListing(client, newListing) {
    const result = await client.db("movie_collection_database").collection("movies").insertOne(newListing);

    console.log(`New listing created with the following id: ${result.insertedId}`);
}

// 2) Multiple Line Creating....
async function createMultipleListings(client, newListings) {
    const result = await client.db("movie_collection_database").collection("movies").insertMany(newListings);

    console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
    console.log(result.insertedIds);
}


//--------------------------READ functions (Mohamed) --------------------------------------//


// ----------------------- Example ----------------------------------
/*
async function findOneListingByName(client, nameOfListing) {
    const result = await client.db("movie_collection_database").collection("movies").findOne({});

    if (result) {
        console.log(`Found a listing in the collection with the name '${nameOfListing}'`);
        console.log(result);
    } else {
        console.log(`No listing found with name '${nameOfListing}'`);
    }
}    
*/