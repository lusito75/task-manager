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
        User.find({}, (e, users) => {
            if (e) {
                res.status(500).send(e);
            }
            res.status(200).send(users)
        })
    } catch (e) {
        res.status(500).send()
    }
    // try {
    //     const users = await User.find({})
    //     res.status(200).send(users);
    // } catch (e) {
    //     res.status(500).send();
    // }

    // older way, no async/await syntax 
    // User.find({}).then((e, users) => {
    //     res.status(200).send(users);
    // }).catch((e, users) => {
    //     res.status(500).send();
    // })
});

// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id;
//     try {
//         const user = await User.findById(_id)
//         if (!user) {
//             return res.status(404).send()
//         }
//         res.status(200).send(user);
//     } catch (e) {
//         res.status(500).send()
//     }
    
//     // older way, no async/await syntax
//     // User.findById(_id).then((user) => {
//     //     if (!user) {
//     //         return res.status(404).send();
//     //     }
//     //     res.status(200).send(user);
//     // }).catch((e) => {
//     //     res.status(500).send(e);
//     // });
// });

// router.patch('/users/:id', async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['name', 'email', 'password', 'age']
//     const isValidOperation = updates.every((update) => {
//         return allowedUpdates.includes(update)
//     })

//     if (!isValidOperation) {
//         return res.status(400).send({error: "Invalid update"})
//     }

//     try {
//         const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

//         if (!user) {
//             return res.status(404).send()
//         }
//         res.status(200).send(user)
//     } catch (e) {
//         // server or validation issues
//         res.status(400).send(e)
//     }
// })

// router.delete('/users/:id', async (req, res) => {
//     try {
//         const user = await User.findByIdAndDelete(req.params.id)
//         if (!user) {
//             return res.status(404).send()
//         }
//         res.status(200).send(user)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })


module.exports = router