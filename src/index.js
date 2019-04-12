const express = require('express')
require('./db/mongoose')  //connect to mongodb
require('./db/ottoman')   //connect to couchbase

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const userRouterCB = require('./routers/user-cb')
const taskRouterCB = require('./routers/task-cb')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter)
app.use(taskRouter)
//couchbase routes
app.use(userRouterCB)
app.use(taskRouterCB)


app.listen(port, () => {
    console.log('Server is up on port: ' + port);
})