// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
const { ObjectID, MongoClient } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'

const databaseName = 'taskManager'

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
        return console.log("Unable to connect to Database");

    }
    const db = client.db(databaseName);
    db.collection('users').deleteOne({ _id: new ObjectID('608e78cae386dc211ced144f') }).then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    })
    // db.collection('users').deleteMany({ completed: false }).then((result) => {
    //     console.log(result);
    // }).catch((err) => {
    //     console.log(err);
    // })
    // db.collection('tasks').updateMany({ completed: false },
    //     {
    //         $set: {
    //             completed: true
    //         }
    //     }).then((result) => {
    //         console.log(result);
    //     }).catch((err) => {
    //         console.log(err);
    //     })
    // db.collection('users').updateOne({ _id: new ObjectID('608e775f180eb215ccbbf902') },
    //     {
    //         $set: {
    //             name: 'Girija',
    //             age: 65
    //         }
    //     }).then((result) => {
    //         console.log(result);
    //     }).catch((err) => {
    //         console.log(err);
    //     })
    // db.collection('users').findOne({ _id: new ObjectID('608e78cae386dc211ced144f') }, (err, user) => {
    //     if (err) {
    //         return console.log("Unable to Fetch")
    //     }
    //     console.log(user)
    // })

    // db.collection('tasks').find({ completed: false }).toArray((err, users) => {
    //     if (err) {
    //         return console.log("Unable to fetch");

    //     }
    //     console.log(users);
    // })
    // db.collection('users').findOne({ _id: new ObjectID('608e775f180eb215ccbbf902') }, (err, user) => {
    //     if (err) {
    //         console.log("Unable to find the Data");
    //     }
    //     console.log(user);
    // })
    // db.collection('users').find({ age: 75 }).toArray((err, users) => {
    //     if (err) {
    //         return console.log("Unable to fetch");
    //     }
    //     console.log(users);

    // })
})
