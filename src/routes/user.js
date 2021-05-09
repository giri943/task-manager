const { Router } = require('express')

const express = require('express')

const router = new express.Router()
const Users = require('../models/user')
const auth = require('../middleware/auth')

router.post('/create-users', async (req, res) => {
    const user = new Users(req.body)
    try {
        await user.save()
        const token = await user.generateToken()
        res.status(201).send({ user, token })
    } catch (err) {

        res.status(400).send(err)

    }

})
router.post('/login-user', async (req, res) => {
    try {
        const user = await Users.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateToken()
        res.status(200).send({ user, token })
    } catch (err) {
        res.status(400).send(err)
    }
})


router.post('/logout-user/me', auth, async (req, res) => {
    try {

        console.log(req.token)
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token

        })
        await req.user.save()

        res.send()
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})

router.post('/logout-user/meAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (err) {
        res.status(500).send()
    }
})


router.get('/read-users/me', auth, async (req, res) => {
    try {
        res.status(200).send(req.body)

    } catch (err) {
        res.status(500).send(err)
    }

})

router.get('/read-users-by/:id', async (req, res) => {
    const id = await req.params.id
    try {
        const user = await Users.findById(id)
        if (!user) {
            return res.status(404).send("Invalid Id")
        }
        res.status(200).send(user)
    } catch (err) {
        res.status(400).send()
    }
})

router.post('/update-user-by/:id', async (req, res) => {
    const id = await req.params.id
    const allowedForUpdates = ['name', 'age', 'email', 'password']
    const updateRequestObject = Object.keys(req.body)
    const updateValidity = updateRequestObject.every((update) => allowedForUpdates.includes(update))
    if (!updateValidity) {
        console.log(updateRequestObject)
        console.log(allowedForUpdates)
        console.log(updateValidity)
        return res.status(400).send("Invalid update field")
    }
    try {
        const user = await Users.findById(id)
        if (!user) {
            res.status(404).send("Invalid User ID")
        }
        updateRequestObject.forEach((update) => user[update] = req.body[update])
        await user.save()
        res.status(200).send(user)

    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/delete-user-by/:id', async (req, res) => {
    const id = await req.params.id
    try {
        const user = await Users.findByIdAndDelete(id)
        if (!user) {
            res.status(400).send("Invalid ID")
        }
        res.status(200).send(user)
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router