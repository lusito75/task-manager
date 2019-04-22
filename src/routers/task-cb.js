const express = require('express')
const router = new express.Router()
const Task = require('../models/task-cb');

// need a minimum of the following index created beforheand:
// CREATE INDEX `type` ON `task-manager-api`(_type)

router.post('/tasks-cb', async (req, res) => {
    const task = new Task(req.body);
    
    task.save((err) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(201).send(task)
        }
    })
});

router.get('/tasks-cb', (req, res) => {
    try {
        Task.find({_type: "Task"}, (e, tasks) => {
            if (e) {
                res.status(500).send(e);
            }
            res.status(200).send(tasks)
        })
    } catch (e) {
        res.status(500).send()
    }
});

router.get('/tasks-cb/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        Task.getById(_id, (e, task) => {
            if (!task) {
                return res.status(404).send()
            }
            res.status(200).send(task);
        })
    } catch (e) {
        res.status(500).send()
    }
});

router.patch('/tasks-cb/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({error: "Invalid update"})
    }

    try {

        Task.getById(req.params.id, (e, task) => {
            if (!task) {
                return res.status(404).send()
            }
            updates.forEach((update) => {
                task[update] = req.body[update]
            })
            task.save((err) => {
                if (err) {
                    res.status(400).send(err);
                } else {
                    res.status(201).send(task)
                }
            })
        })
    } catch (e) {
        // server or validation issues
        res.status(400).send(e)
    }
})

router.delete('/tasks-cb/:id', async (req, res) => {
    try {
        Task.getById(req.params.id, (e, task) => {
            if (!task) {
                return res.status(404).send()
            }
            task.remove((err) => {
                if (err) {
                    res.status(400).send(err);
                } else {
                    res.status(201).send(task)
                }
            })
        })
    } catch (e) {
        res.status(400).send(e)
    }
})



module.exports = router