const express = require('express')
const router = new express.Router()
const User = require('../models/user-cb');

router.post('/users-cb', async (req, res) => {
    const user = new User(req.body);
    
    user.save((err) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(201).send(user)
        }
    })
});

router.get('/users-cb', (req, res) => {
    try {
        User.find({_type: "User"}, (e, users) => {
            if (e) {
                res.status(500).send(e);
            }
            res.status(200).send(users)
        })
    } catch (e) {
        res.status(500).send()
    }
});

router.get('/users-cb/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        User.getById(_id, (e, user) => {
            if (!user) {
                return res.status(404).send()
            }
            res.status(200).send(user);
        })
    } catch (e) {
        res.status(500).send()
    }
});

router.patch('/users-cb/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({error: "Invalid update"})
    }

    try {

        User.getById(req.params.id, (e, user) => {
            if (!user) {
                return res.status(404).send()
            }
            updates.forEach((update) => {
                user[update] = req.body[update]
            })
            user.save((err) => {
                if (err) {
                    res.status(400).send(err);
                } else {
                    res.status(201).send(user)
                }
            })
        })
    } catch (e) {
        // server or validation issues
        res.status(400).send(e)
    }
})

router.delete('/users-cb/:id', async (req, res) => {
    try {
        User.getById(req.params.id, (e, user) => {
            if (!user) {
                return res.status(404).send()
            }
            user.remove((err) => {
                if (err) {
                    res.status(400).send(err);
                } else {
                    res.status(201).send(user)
                }
            })
        })
    } catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router