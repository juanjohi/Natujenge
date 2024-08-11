

const express = require('express')
const { deposit, transfer, getBal, statement } = require('../controllers/twallet')
const router = express.Router()


router.post('/deposit', deposit)
router.post('/transfer', transfer)
router.get('/balance', getBal)
router.get('/statement', statement)




module.exports = router