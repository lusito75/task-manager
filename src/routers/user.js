const express = require('express')
const router = new express.Router()
const User = require('../models/user');
const auth = require('../middleware/auth')

router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }

    // older way, no async/await syntax
    // user.save().then(() => {
    //     res.status(201).send(user);
    // }).catch((e) => {
    //     res.status(400).send(e);
    // })
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }

})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user) //auth mdw would have already retrieved the user
});

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.status(200).send(user);
    } catch (e) {
        res.status(500).send()
    }
    
    // older way, no async/await syntax
    // User.findById(_id).then((user) => {
    //     if (!user) {
    //         return res.status(404).send();
    //     }
    //     res.status(200).send(user);
    // }).catch((e) => {
    //     res.status(500).send(e);
    // });
});

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({error: "Invalid update"})
    }

    try {
        const user = await User.findById(req.params.id)
        updates.forEach((update) => {
            user[update] = req.body[update]
        })
        await user.save()  // this way instead of simpler "findByIdAndUpdate" so we can use the pre() save middleware to hash passwds
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

        if (!user) {
            return res.status(404).send()
        }
        res.status(200).send(user)
    } catch (e) {
        // server or validation issues
        res.status(400).send(e)
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send()
        }
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router