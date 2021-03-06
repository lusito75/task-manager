const express = require('express')
const router = new express.Router()
const User = require('../models/user');
const auth = require('../middleware/auth')

const multer = require('multer')
const sharp = require('sharp')

const { sendWelcomeEmail, sendGoodbyeEmail } = require('../emails/account')

router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save()
        sendWelcomeEmail(user.email, user.name)
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

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user) //auth mdw would have already retrieved the user
});

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({error: "Invalid update"})
    }

    try {
        const user = req.user
        updates.forEach((update) => {
            user[update] = req.body[update]
        })
        await user.save()  // this way instead of simpler "findByIdAndUpdate" so we can use the pre() save middleware to hash passwds
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

        res.status(200).send(user)
    } catch (e) {
        // server or validation issues
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id)
        // if (!user) {
        //     return res.status(404).send()
        // }  OR the single line below using mongoose document remove()
        sendGoodbyeEmail(req.user.name, req.user.email)
        await req.user.remove()
        res.status(200).send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})


// avatar upload routes for user
const upload = multer({
    // dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if ( !file.originalname.match(/\.(jpg|jpeg|png)$/) ) {
            return cb(new Error('please upload a jpg/jpeg/png image file'))
        }
        cb(undefined, true)
    }
})
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send( {error: error.message} )
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    try {
        if (req.user.avatar) {
            req.user.avatar = undefined
            await req.user.save()
        }
        res.send()
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user || !user.avatar) {
            throw new Error('No User or avatar found')
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch {
        res.status(404).send(e)
    }
})


module.exports = router