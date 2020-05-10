require('dotenv').config()
const express = require('express')
const router = require('./router')
const port = process.env.PORT || 3000
const app = express()
const cors = require('cors')
const errHandler = require('./middleware/errHandler')

app.use(cors())
app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.use(router)
app.use(errHandler)

app.listen(port,console.log('app is listening : ', port))