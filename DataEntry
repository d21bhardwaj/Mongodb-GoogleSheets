exports = async function(payload) {
    const mongodb = context.services.get("mongodb-atlas");
    const eventsdb = mongodb.db("gigforce");
    const eventscoll = eventsdb.collection("test");
    const result= await eventscoll.insertOne(payload.query);
    var id = result.insertedId;
    if(result) {
        return id;
     }
    return { text: `Error saving` };
}
