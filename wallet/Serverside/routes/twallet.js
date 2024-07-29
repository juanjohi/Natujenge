

const express = require('express')
const { deposit, transfer, getBal } = require('../controllers/twallet')
const router = express.Router()


router.post('/deposit', deposit)
router.post('/transfer', transfer)
router.get('/balance', getBal)



module.exports = router