const {MongoClient, ServerApiVersion} = require('mongodb');

async function main() {

    const uri ="mongodb+srv://purekorea:node1234@cluster0.jcomwxz.mongodb.net/?retryWrites=true&w=majority";

    const client = new MongoClient(uri, { useUnifiedTopology: true });
    // nodeconst client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    try {
        await client.connect();

        await createListing(client, {
            title: "Titanic",
            release_year: 1997,
            run_time: 194.00,
            director_id: 1 
        })

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
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