const { MongoClient, ObjectID } = require('mongodb');

// ASYNC/AWAIT
(async function connectToMongoDB() {
  let client;
  try {
    // Connecting to DB
    client = await MongoClient.connect('mongodb://localhost:27017/todoapi');
    console.log('Connected to MongoDB Server');
    // Reference to the collection
    const db = client.db('todoapi');
    // Inserting a document to the collection // TODOS
    // insertDoc(db, 'Todos', {
    //   text: 'Something to do',
    //   completed: false
    // });
    // Inserting a document to the collection // USERS
    insertDoc(db, 'Users', {
      name: 'Aleksandar',
      age: 22,
      location: 'Brcko Distrikt'
    });
    /* let todo;
    try {
      todo = await db.collection('Todos').insertOne({
        text: 'Something to do',
        completed: false
      });
      console.log(JSON.stringify(todo.ops, undefined, 2));
    } catch (error) {
      console.log('Unable to insert a todo', error);
    }
    */
    // Closing a connection
    client.close();
  } catch (error) {
    console.log('Unable to connect to MongoDB server');
  }
})();

// A function for inserting docs into the collection
async function insertDoc(db, nameOfCollection, document) {
  let doc;
  try {
    doc = await db.collection(nameOfCollection).insertOne(document);
    console.log(JSON.stringify(doc.ops, undefined, 2));
  } catch (error) {
    console.log('Unable to insert a doc', error);    
  }
}

// USING CALLBACKS
  /*MongoClient.connect('mongodb://localhost:27017/todoapi', (err, client) => {
    if (err) {
      return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('todoapi');

    db.collection('Todos').insertOne({
      text: 'Something to do',
      completed: false,
    }, (error, result) => {
      if (error) {
        return console.log('Unable to insert todo', error);
      }

      console.log(JSON.stringify(result.ops, undefined, 2));
    });

    // Insert new doc into Users(name, age, location)
    db.collection('Users').insertOne({
      name: 'Aleksandar',
      age: 22,
      location: 'Brcko Distrikt'
    } (error, result => {
      if (error) {
        return console.log('Unable to insert user', error);
      }
      console.log(JSON.stringify(result.ops));
    });
    client.close();
  });
  */
