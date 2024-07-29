

const express = require('express')
require('dotenv').config()
const app = express()
const helmet = require('helmet')
const cors = require('cors')
const rateLimiter = require('express-rate-limit')

const authenticateUser = require('./middleware/authentication')

app.use(express.json())
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000, 
	limit: 100, 
	standardHeaders: 'draft-7', 
	legacyHeaders: false, 
	
}))
app.use(helmet())
app.use(cors())


const connectDb = require('./db/connect')
const authroute = require('./routes/wallet')
const transcationRoute =  require('./routes/twallet')

app.use('/api/v1/auth', authroute)
app.use('/api/v1/transaction', authenticateUser, transcationRoute)

const port = 3000 || process.env.PORT

const start = async ()=>{
    try{
        await connectDb(process.env.MONGO_URI)
        app.listen(port, console.log(`server listening on port ${port}`))
    }
    catch(error){
        console.log(error)
    }
}

start()