

const express = require ('express')
const app = express()
const tasks = require ('./routes/tasks')
const connectDB = require('./db/connect')
const cors = require('cors')
require('dotenv').config()

app.use(express.json())
app.use(cors())
app.use(express.static('./public'))


app.use('/api/v1/tasks', tasks)

const port = process.env.PORT || 3000

const start = async () => {
   try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`server listening to port ${port}`))
   } catch (error) {
    console.log(error);
   }
}

start()