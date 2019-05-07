const express = require('express')
require('./db/mongoose')  //connect to mongodb
require('./db/ottoman')   //connect to couchbase

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const userRouterCB = require('./routers/user-cb')
const taskRouterCB = require('./routers/task-cb')

const app = express();

app.use(express.json());
app.use(userRouter)
app.use(taskRouter)
//couchbase routes
app.use(userRouterCB)
app.use(taskRouterCB)


module.exports = app
