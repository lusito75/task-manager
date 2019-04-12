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

    // db.collection('Todos').find({completed: false}).toArray().then((docs) => {
    //     console.log('Todos:');
    //     console.log(JSON.stringify(docs, undefined, 2))
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // })

    // db.collection('Todos').find({
    //     _id: new ObjectID('5bf98d84898d10215ce02a32')
    // }).toArray().then((docs) => {
    //     console.log('Todos:');
    //     console.log(JSON.stringify(docs, undefined, 2))
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // })

    db.collection('Todos').find({
        _id: new ObjectID('5bf98d84898d10215ce02a32')
    }).count().then((count) => {
        console.log('Todos count:', count);
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });

    // client.close();
});