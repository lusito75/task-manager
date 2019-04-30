const couchbase = require('couchbase')
const ottoman = require('ottoman')

const cluster = new couchbase.Cluster(process.env.CB_URL)
cluster.authenticate(process.env.CB_USER, process.env.CB_PASSWORD);
ottoman.bucket = cluster.openBucket(process.env.CB_BUCKET)



// some ottoman playground stuff
// https://dzone.com/articles/easily-develop-nodejs-and-couchbase-apps-with-otto

// ottoman.bucket = cluster.openBucket('test-bucket')

// const UserModel = ottoman.model("UserTest", {
//     firstname: {type: "string"},
//     lastname: {type: "string"},
//     email: {type: "string", readonly: true},
//     created_at: {type: "Date", default: Date.now}
// }, { id: 'email' });   // 3rd argument is options for setting custom key

// const myUser = new UserModel({
//     firstname: "Nic",
//     lastname: "Raboy",
//     email: "test@example.com"
// });

// myUser.save(function(error) {
//     if(error) {
//         console.log("An error happened -> " + JSON.stringify(error));
//     } else {
//         console.log("Save successful!");
//     }
// });

// const myUser2 = new UserModel({
//     firstname: "Paulo",
//     lastname: "Leiteiro",
//     email: "paulo.leiteiro@gmail.com"
// });

// myUser2.save(function(error) {
//     if(error) {
//         console.log("An error happened -> " + JSON.stringify(error));
//     } else {
//         console.log("Save successful!");
//     }
// });

// // find all docs -- will fail without defined primary index
// UserModel.find({}, (error, user) => {
//     if(error) {
//         console.log("An error happened -> " + JSON.stringify(error));
//     } else {
//         console.log(user)
//     }
// });


// UserModel.getById('test@example.com', (err, user) => {
//     if (err) {
//         console.log("An error happened -> " + JSON.stringify(err));
//     } else {
//         console.log(user)
//     }
// })