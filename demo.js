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
        //await findOneMovieByTitle(client,"Titanic 2");
       // await deleteListingByTitle(client, "Titanic" );
       await deleteListingsByRelssingYear(client, new Date("2023-02-25"));
        


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
// -----------------READ ----------------------------------------------


async function findOneMovieByTitle(client, nameOfListing) {
    const result = await client.db("movie_collection_database").collection("movies").findOne({ Title : nameOfListing });

    if (result) {
    console.log(`Found a movie in the collection with the Title '${nameOfListing}'`);
    console.log(result);
    } else {
    console.log(`No movie were found '${nameOfListing}'`);
    }
    }
//-----------------------DELETE functions--------------------------------//

/**async function deleteListingByTitle(client, nameOfListing) {
    const result = await client.db("movie_collection_database").collection("movies")
            .deleteOne({ name: nameOfListing });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);        
}*/
async function deleteListingsByRelssingYear(client, Date) { 
    const result = await client.db("movie_collection_database").collection("movies")
        .deleteMany({ "last_Movie": { $lt: Date} });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}
