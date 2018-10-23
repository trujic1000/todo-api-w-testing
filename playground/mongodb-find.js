const { MongoClient, ObjectID } = require('mongodb');

(async function connectToMongoDB() {
  let client;
  try {
    // Connecting to DB
    client = await MongoClient.connect('mongodb://localhost:27017/todoapi');
    console.log('Connected to MongoDB Server');
    // Reference to the collection
    const db = client.db('todoapi');

    // let todos;
    // try {
    //   todos = await db.collection('Todos').find().toArray();
    //   console.log(JSON.stringify(todos, undefined, 2));
    // } catch (error) {
    //   console.log('Unable to fetch data', error);
    // }

    let users;
    try {
      users = await db.collection('Users').find({name: 'Mirko'}).toArray();
      console.log(JSON.stringify(users, undefined, 2));
    } catch (error) {
      console.log('Unable to fetch data', error);
    }
    
    // db.collection('Todos').find().toArray().then(docs => {
    //   console.log('Todos');
    //   console.log(JSON.stringify(docs, undefined, 2));
    // }, err => {
    //   console.log('Unable to fetch todos', err);
    // });
    // client.close();
  } catch (error) {
    console.log('Unable to connect to MongoDB server');
  }
})();