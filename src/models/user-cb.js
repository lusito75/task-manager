const ottoman = require('ottoman')

const UserCB = ottoman.model('User', {
    name: {type: "string"},
    email: {type: "string"},
    age: {type: "integer"},
    password: {type: "string"},
    created_at: {type: "Date", default: Date.now}
});

module.exports = UserCB;