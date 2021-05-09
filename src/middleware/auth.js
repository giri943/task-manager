const jwt = require('jsonwebtoken')
const Users = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'secretcode')
        const user = await Users.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }
        req.token = token
        req.body = user

        next()
    } catch (err) {
        res.status(401).send({ error: 'Please Authenticate.' })
    }
}
module.exports = auth