const ottoman = require('ottoman')

const UserCB = ottoman.model('User', {
    name: 'string',
    email: 'string',
    age: 'integer',
    password: 'string'
});

module.exports = UserCB;