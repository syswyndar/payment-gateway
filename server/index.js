const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
const UserController = require('./controllers/userController')
const TopupController = require('./controllers/topupController')
const userAuthentication = require("./middleware/authentication");

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.post('/register', UserController.register)
app.get('/login', UserController.login)
app.use(userAuthentication)
app.get('/userDetail', UserController.userDetail)
app.post('/topup', TopupController.topUp)
app.put('/topupSuccess', TopupController.topupSuccess)

app.listen(port, () => {
    console.log(`server running in port ${port}`)
})