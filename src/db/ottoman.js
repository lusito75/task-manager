const couchbase = require('couchbase')
const ottoman = require('ottoman')

const cluster = new couchbase.Cluster('couchbase://127.0.0.1')
cluster.authenticate('prl', 'mericia1');
ottoman.bucket = cluster.openBucket('task-manager-api')




