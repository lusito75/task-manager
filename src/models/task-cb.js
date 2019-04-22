const ottoman = require('ottoman');

const TaskCB = ottoman.model('Task', {
    description: {type: "string"},
    completed: {type: "string"},
    created_at: {type: "Date", default: Date.now}
});

module.exports = TaskCB;