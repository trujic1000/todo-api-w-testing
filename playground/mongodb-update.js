const { MongoClient, ObjectID } = require('mongodb');

(async function connectToMongoDB() {
  let client;
  try {
    // Connecting to DB
    client = await MongoClient.connect('mongodb://localhost:27017/todoapi');
    console.log('Connected to MongoDB Server');
    // Reference to the collection
    const db = client.db('todoapi');

    // findOneAndUpdate
    try {
      const updated = await db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5bc5341f56b9d09acaf5e0b3')
      }, {
        $set: {
          completed: true
        }
      }, {
        returnOriginal: false
      });
      console.log(updated);
    } catch (error) {
      console.log('Updating failed', error);
    }


    // client.close();
  } catch (error) {
    console.log('Unable to connect to MongoDB server');
  }
})();