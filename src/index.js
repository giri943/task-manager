const express = require('express')
const app = express()
const userRouter = require('../src/routes/user')
const taskRouter = require('../src/routes/task')
const auth = require('./middleware/auth')

app.use(express.json())
require('./db/mongoose')

const port = process.env.PORT || 3000
// app.use((req, res, next) => {
//     res.status(503).send("Site down for maintenance")
// })

app.use(userRouter)
app.use(taskRouter)

app.get('/', (req, res) => {
    res.send("Hi Girish")
})




app.listen(port, () => {
    console.log("Server is on at port 3000");
})

// const bcrypt = require('bcryptjs')
// const pswdAuth = async () => {
//     const pswd = 'Girish123'
//     const hashPswd = await bcrypt.hash(pswd, 8)
//     const comparePswd = await bcrypt.compare('Girish123', hashPswd)
//     try {
//         if (!comparePswd) {
//             return console.log("Invalid passwor Entered");
//         }
//         console.log('Password matched')
//     } catch (err) {
//         console.log(err);
//     }

// }
// pswdAuth()


// const jwt = require('jsonwebtoken')
// const generateToken = async () => {
//     const token = await jwt.sign({ _id: 'abcd123' }, 'secretCode')
//     const tokenVerify = await jwt.verify(token, "secretCode")
//     if (!tokenVerify) {
//         console.log("Token verification failed")
//     }
//     console.log('Success ' + token)
//     console.log(tokenVerify);
// }

// generateToken()
