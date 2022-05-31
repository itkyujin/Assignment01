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
        -----------------------------------------------------------------------------
        */

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

//-----------------------UPDATE functions--------------------------------//

// 1) Sing Line listing Updating By Name Value(s)....
async function UpdateListingByName(client, nameOfListing, UpdatedListing) {
    const result = await client.db("movie_collection_database").collection("movies")
        .UpdateOne({ name: nameOfListing }, { $set: UpdatedListing });
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);    
}

async function updateAllListingsToHaveDirectorName(client) {
    const result = await client.db("movie_collection_database").collection("movies")
        .UpdateMany({ DirectorName: { $exists: false } },
                    { $set: { DirectorName: "Unknown"} });
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

//-----------------------UPSERT functions--------------------------------//
// 1) Upserting By Name Value(s)....
async function upsertListingByName(client, nameOfListing, UpdatedListing) {
    const result = await client.db("movie_collection_database").collection("movies")
        .UpdateOne({ name: nameOfListing },
                   { $set: UpdatedListing },
                   {upsert: true });
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    
    if (result.upsertedCount > 0) {
        console.log(`One document was inserted with the id ${result.upsertedId._id}`);
    } else {
        console.log(`${result.modifiedCount} document(s) was/were updated.`);
    }
}

//-----------------------DELETE functions--------------------------------//

async function deleteListingByName(client, nameOfListing) {
    const result = await client.db("movie_collection_database").collection("movies")
            .deleteOne({ name: nameOfListing });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);        
}

async function deleteListingsByDirectorName(client, nameOfListing) {
    const result = await client.db("movie_collection_database").collection("movies")
            .deleteMany({ ""});
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}