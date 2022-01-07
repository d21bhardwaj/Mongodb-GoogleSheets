exports = async function(payload) {
    console.log('test', payload.query._id);
    const mongodb = context.services.get("mongodb-atlas");
    const eventsdb = mongodb.db("gigforce");
    const eventscoll = eventsdb.collection("test");
    const objectId = new BSON.ObjectId(payload.query._id);
    console.log('eventscoll', JSON.stringify(objectId));
    console.log('eventscoll', JSON.stringify(eventscoll));
    console.log(BSON.ObjectId(payload.query._id));
    const delresult = await eventscoll.deleteOne({"_id":objectId});
    console.log('delresult', JSON.stringify(delresult));
    // const delresult = await eventscoll.deleteOne(_id: new ObjectI)
    return { text: ` ${delresult.deletedCount} `};
   };
