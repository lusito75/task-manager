// const MongoClient = require('mongodb').MongoClient;

// object destructuring (ES6)
// var user = {name: 'Paulo', gae: 25}
// var {name} = user;
// console.log(name);

const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        console.log('Unable to connect to MongoDb');
    }
    console.log('Connected to MongoDb server');
    const db = client.db('TodoApp');

    // findOneAndUpdate
    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID("5bf98d84898d10215ce02a32")
    }, {
        $set: {
            completed: true
        }
    }, {returnOriginal: false}).then((result) => {
        console.log(result);
    });

    // client.close();
});