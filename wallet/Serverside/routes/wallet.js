

const express = require('express')
const router = express.Router()
const {login, register, updateUser} = require('../controllers/wallet')


router.post('/login', login)
router.post('/register', register)
router.patch('/update', updateUser)

module.exports = router