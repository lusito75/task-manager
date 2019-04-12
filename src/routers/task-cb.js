const express = require('express')
const router = new express.Router()
const Task = require('../models/task-cb');

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

// router.get('/tasks', async (req, res) => {
//     try {
//         const tasks = await Task.find({})
//         res.status(200).send(tasks)
//     } catch (e) {
//         res.status(500).send()
//     }

// });

// router.get('/tasks/:id', async (req, res) => {
//     const _id = req.params.id
//     try {
//         const task = await Task.findById(_id)
//         if (!task) {
//             return res.status(404).send();
//         }
//         res.status(200).send(task);
//     } catch (e) {
//         res.status(500).send()
//     }
// })

// router.patch('/tasks/:id', async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['description', 'completed']
//     const isValidOperation = updates.every((update) => {
//         return allowedUpdates.includes(update)
//     })

//     if (!isValidOperation) {
//         return res.status(400).send({error: "Invalid update"})
//     }

//     try {
//         const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
//         if (!task) {
//             return res.status(404).res.send()
//         }
//         res.status(200).send(task)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

// router.delete('/tasks/:id', async (req, res) => {
//     try {
//         const task = await Task.findByIdAndDelete(req.params.id)
//         if (!task) {
//             return res.status(404).send()
//         }
//         res.status(200).send(task)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })


module.exports = router