const express = require('express')
const router = new express.Router()
const Task = require('../models/task');
const auth = require('../middleware/auth')

router.post('/tasks', auth, async (req, res) => {
    const task = new Task ({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e);
    }
});

// GET /tasks?completed=true
// GET /tasks?limit=10?skip=20
// GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
    const match = {
        owner: req.user._id
    }
    const sort = {}
    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }
    if (req.query.sortBy) {
        const field = req.query.sortBy.split(':')[0]
        const sortvalue = req.query.sortBy.split(':')[1] === 'desc' ? -1 : 1
        sort[field] = sortvalue
    }
    try {
        const tasks = await Task
            .find( match )
            .limit(parseInt(req.query.limit))
            .skip(parseInt(req.query.skip))
            .sort( sort )
        res.status(200).send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }

});

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOne({ _id, owner: req.user._id })
        if (!task) {
            return res.status(404).send();
        }
        res.status(200).send(task);
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({error: "Invalid update"})
    }

    try {
        const task = await Task.findOneAndUpdate({ _id: req.params.id, owner: req.user._id })
        if (!task) {
            return res.status(404).res.send()
        }
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.status(200).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id})
        if (!task) {
            return res.status(404).send()
        }
        res.status(200).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router