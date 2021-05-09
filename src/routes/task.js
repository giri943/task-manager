const { Router } = require('express')
const express = require('express')
const router = new express.Router()
const Tasks = require('../models/task')
router.post('/create-tasks', async (req, res) => {
    const task = new Tasks(req.body)
    try {
        await task.save()
        res.status(200).send(task)
    } catch (err) {
        res.status(400).send("err")
    }
})

router.get('/read-task', async (req, res) => {
    try {
        const task = await Tasks.find()
        res.status(200).send(task)
    } catch (err) {
        res.status(500).send(err)
    }

})

router.get('/read-task-by/:id', async (req, res) => {
    const id = await req.params.id
    try {
        const task = await Tasks.findById(id)
        if (!task) {
            return res.status(404).send("Invalid ID")
        }
        res.status(200).send(task)

    } catch (err) {
        res.status(400).send(err)
    }
})
router.post('/update-task-by/:id', async (req, res) => {
    const id = await req.params.id
    const allowedForUpdates = ["name", "completed"]
    const updateRequestObject = Object.keys(req.body)
    const updateValidity = allowedForUpdates.every((update) => updateRequestObject.includes(update))
    console.log(updateValidity)

    if (!updateValidity) {
        res.status(400).send("Invalid update field")
    }
    try {
        const task = await Tasks.findById(id)
        if (!task) {
            res.status(400).send("Invalid Id")
        }
        updateRequestObject.forEach((update) => task[update] = req.body[update])
        res.status(200).send(task)
    } catch (err) {
        res.status(404)
    }
})

router.post('/delete-task-by/:id', async (req, res) => {
    const id = await req.params.id
    try {
        const task = await Tasks.findByIdAndDelete(id)
        if (!task) {
            return res.status(400).send("Invalid Id")
        }
        res.status(200).send(task)
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router