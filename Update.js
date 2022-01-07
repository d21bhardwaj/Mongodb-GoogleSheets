exports = async function(payload) {
    
    const mongodb = context.services.get("mongodb-atlas");
    const eventsdb = mongodb.db("gigforce");
    const eventscoll = eventsdb.collection("test");
    const objectId = new BSON.ObjectId(payload.query._id);
    payload.query._id = objectId;
    console.log('test', payload.query._id);
    console.log('eventscoll', JSON.stringify(objectId));
    console.log('eventscoll', JSON.stringify(eventscoll));
    const represult = await eventscoll.replaceOne({"_id":objectId},payload.query);
    console.log('represult', JSON.stringify(represult));
    // const delresult = await eventscoll.deleteOne(_id: new ObjectI)
    return ( JSON.stringify(represult));
   };
