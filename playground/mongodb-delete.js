const { MongoClient, ObjectID } = require('mongodb');

(async function connectToMongoDB() {
  let client;
  try {
    // Connecting to DB
    client = await MongoClient.connect('mongodb://localhost:27017/todoapi');
    console.log('Connected to MongoDB Server');
    // Reference to the collection
    const db = client.db('todoapi');

    // deleteMany
    // try {
    //   const deleted = await db.collection('Todos').deleteMany({text: 'Eat lunch'});
    //   console.log(deleted);
    // } catch (error) {
    //   console.log('Unable to delete todos', error);
    // }

    // deleteOne
    // try {
    //   const deleted = await db.collection('Todos').deleteOne({text: 'Eat lunch'});
    //   console.log(deleted);
    // } catch (error) {
    //   console.log('Unable to delete todos', error);
    // }
    // findOneAndDelete
    try {
      const deleted = await db.collection('Todos').findOneAndDelete({ _id: new ObjectID('5bc39bc356b9d09acaf5df55')});
      console.log(deleted);
    } catch (error) {
      console.log('Unable to delete todos', error);
    }
    // client.close();
  } catch (error) {
    console.log('Unable to connect to MongoDB server');
  }
})();