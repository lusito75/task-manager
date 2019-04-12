const ottoman = require('ottoman');

const TaskCB = ottoman.model('Task', {
    description: 'string',
    completed: 'boolean'
});

module.exports = TaskCB;