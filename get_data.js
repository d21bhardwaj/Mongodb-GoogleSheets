exports = function(payload){
  const mongodb = context.services.get('mongodb-atlas');
  const collection = mongodb.db("gigforce").collection("sample");
  return collection.find({}).toArray();
};
